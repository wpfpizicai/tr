
var Selector = require('../Selector/index.jsx');
var AS = require('./service.jsx');
var SendMessageController = React.createClass({
  getInitialState(){
      return {
        title: this.props.title||null,
        content: this.props.content || null,
        days : this.props.days || null,
        isUpdate : this.props.isUpdate == undefined ? false : this.props.isUpdate,
        status: this.props.status==undefined? false: this.props.status
      }
  },
  render(){
    return (
      <button className="modal-bg" style={{'display': this.state.status?'none':'block'}}>
        <div className={'row message-box card'} style={{'width':'800px'}}>
          <div className={'row'}>
            <h1>{this.state.isUpdate ? '修改公告' : '新建公告' }</h1>
          </div>
          <div className={'row'}>
            <div className={'col col-left'}>
              <span className="txt">公告标题</span>
            </div>
            <div className={'col col-right'}>
              <input className={'input input-long'} data-role="input" value={this.state.title} onChange={this.changeTitle} placeholder="请输入消息标题"/>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col col-left'}>
              <span className="txt">公告内容</span>
            </div>
            <div className={'col col-right'}>
              <textarea className={'input input-long'}
               style={{height:'200px',resize:'vertical'}}
               data-role={"input"}
               value={this.state.content}
               onChange={this.changeContent}
               placeholder="请输入消息内容,输入链接请使用这种格式 &lt;a href=&quot;链接地址&quot;&gt;链接名称&lt;/a&gt; ,如: &lt;a href=&quot;http://www.google.com.hk/&quot;&gt;谷歌&lt;/a&gt;" ></textarea>
            </div>
          </div>
          <div className={`row ${this.state.isPushNow?'hide':''}`}>
            <div className={'col col-left'}>
              <span className={'txt'}>有效天数(发布算起)</span>
            </div>
            <div className={`col col-right`}>
              <input type="text" className={'input input-tiny' } data-role="input" value={this.state.days} onChange={this.changeDays} placeholder="公告有效天数"/>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col col-left'}></div>
            <div className={'col col-right'}>
              <span className="radiusBtn square style_1 auto" onClick={this.pushMessage}>{this.state.isUpdate ? '保存修改' : '发布公告' }</span>
              <span className="radiusBtn square style_1 auto" onClick={this.pushMessage} onClick={this.cancelEdit}>取消编辑</span>
            </div>
          </div>
        </div>
      </button>
    )
  },
  changeTitle(ev){
    this.state.title = ev.target.value;
    this.setState(this.state);
  },
  changeContent(ev){
    this.state.content = ev.target.value;
    this.setState(this.state);
  },
  changeDays(ev){
    this.state.days = ev.target.value;
    this.setState(this.state);
  },

  pushMessage(ev){

    console.log('消息json如下');
    let message = {
      title: this.state.title,
      content: this.state.content,
    }
    var flag = true;
    if(!this.state.title){
      alert('标题不能为空');
      flag = false;
    }
    if(!this.state.content){
      alert('内容不能为空');
      flag = false;
    }
    if(this.state.days - 0 <= 0){
      alert('持续时间至少为一天!');
      flag = false;
    }


    if(flag){
      this.publishMessage();
    }else{
      return false;
    }

  },
  publishMessage(){
    if(confirm('确认要发布消息吗')){
      console.log(this.state);
      if(!this.state.isUpdate){
        AS.notice.add(this.state)
          .done(()=>{
            this.state.status = true;
            alert('发布成功!');
            this.props.onSave && this.props.onSave();
            this.setState(this.state);
        })
      }else{
        var data = {
          notice_id : this.props.notice_id,
          title : this.state.title,
          content : this.state.content,
          days : this.state.days
        };
        AS.notice.update(data)
          .done(()=>{
            this.state.status = true;
            alert('修改成功!');
            this.props.onSave && this.props.onSave();
            this.setState(this.state);
        })
      }
    }
  },
  cancelEdit(){
    if(confirm('确认要放弃编辑吗?')){
      this.state.status = true;
      this.setState(this.state);
    }
  }
});


var MessageListController = React.createClass({
  getInitialState(){
    this.state = {
      list : null,
      days : this.props.days== undefined ? 30 : this.props.days,
    };
    this.getList();
    return this.state;
  },
  getList(){
    var me = this;
    AS.notice.list({days : this.state.days})
      .done((list)=>{
        if(list && list.length > 0){
          me.state.list = list.concat();
          me.setState(me.state);
        }
      })
  },
  render(){
    return (
      <div className="card">
        <div className="row">
          <div className="col">
            <h1 className="txt">查询公告</h1>
          </div>
          <div className="col">
            <span className="radiusBtn style_1 square short-height auto" onClick={this.createNotice}>创建公告</span>
          </div>

        </div>
        <div className="row">
          <div className="col col-left">
            <span className="txt">请输入默认查询区间(距今的天数)</span>
          </div>
          <div className="col col-right">
            <input className="input input-tiny" value={this.state.days} onChange={this.setDays} placeholder={`请输入天数,默认${this.props.days}天`}/>
            <span className="txt">&nbsp; 天</span>
          </div>
          <div className="col col-right">
            <span className="radiusBtn style_2 short-height square auto" onClick={this.triggerRetrieve}>查询</span>
          </div>
        </div>
        <div className="row">
          {this.renderTable()}
        </div>
      </div>
    );
  },
  renderTable(){

    if(this.state.list){
      return (
        <table>
          <thead>
            <tr>
              <th width="20%">标题</th>
              <th width="20%">内容</th>
              <th width="20%">创建时间</th>
              <th width="20%">过期时间</th>
              <th width="20%">操作</th>
            </tr>
          </thead>
          <tbody>
            {this.renderListItems()}
          </tbody>
        </table>
      )
    }else{
      return (
        <span className="txt">暂时没有查询结果!</span>
      );
    }
  },
  renderListItems(){
    return _.map(this.state.list,(val,i)=>{
      var expireDate = new Date(val.expire_date).toLocaleString();
      var createDate = new Date(val.create_date).toLocaleString();
      return (
        <tr key={val.notice_id}>
          <td>
            <h3>{val.title}</h3>
          </td>
          <td>
            <section>
              {val.content}
            </section>
          </td>
          <td>
            {createDate}
          </td>
          <td>
            {expireDate}
          </td>
          <td>
            <span className="radiusBtn style_2 auto square short-height" onClick={this.triggerUpdate} data-notice-id={val.notice_id} data-index={i}>修改</span>
            <span className="radiusBtn style_8 auto square short-height" onClick={this.triggerDelete} data-notice-id={val.notice_id} data-index={i}>删除</span>
          </td>
        </tr>
      );
    })
  },
  setDays(ev){
    this.state.days = ev.target.value;
    this.setState(this.state);
  },
  triggerUpdate(ev){
    var notice_id = parseInt(ev.target.getAttribute('data-notice-id')),
        index = parseInt(ev.target.getAttribute('data-index'));
    var key = `qwer_${Date.now()}`;
    var container = document.getElementById('m_c');

    var id = (notice_id == undefined) ? null: notice_id;
    var data = this.state.list[index];
    var days = Math.ceil((new Date(data.expire_date) - new Date(data.create_date))/86400000);
    React.render(
      <SendMessageController
        key={key}
        status={false}
        notice_id={notice_id}
        title={data.title}
        content= {data.content}
        days={days}
        isUpdate = {true}
        onSave = {this.triggerRetrieve}
      />,
      container);
  },
  triggerDelete(ev){
    var notice_id = parseInt(ev.target.getAttribute('data-notice-id')),
        index = parseInt(ev.target.getAttribute('data-index'));
    if(confirm('确认要删除此条公告吗?')){
      AS.notice.delete({
        notice_id: notice_id
      })
      .done(()=>{
        alert('删除成功!');
        this.state.list.splice(index,1);
        this.setState(this.state);
      });
    }
  },
  triggerRetrieve(){
    this.getList();
  },
  createNotice(notice_id){
    var key = `qwer_${Date.now()}`;
    var container = document.getElementById('m_c');
    React.render(<SendMessageController key={key} status={false} onSave={this.triggerRetrieve}/>,container);
  }
});


var container_1 = document.getElementsByClassName('container')[0];
React.render(<MessageListController days={0}/>,container_1);
