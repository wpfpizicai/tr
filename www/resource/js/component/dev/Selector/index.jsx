/**
 * Created by wungcq on 15/9/23.
 */

//let React = require('React');


var SelectorListItem = React.createClass({
  getInitialState() {
    return {selected: this.props.selected};
  },
  onSelect(val, index, label){
    this.props.onSelect(val, index, label);
  },

  select() {
    this.state.selected = !this.state.selected;
    this.onSelect(this.props.value, this.props.index, this.props.label);
  },

  render() {
    return (
      <li
        className={this.props.selected ? 's-cur':''}
        onClick={this.select}>
        <div className="text">{this.props.label}</div>
      </li>
    );
  }
});


var Selector = React.createClass({

  setValue(value, index, label) {
    let OldValue = this.state.value;
    this.state.value = value;
    let OldIndex = this.state.index;
    this.state.index = index;
    this.state.label = label;
    //脏检查判断新旧值，发生改变则调用onChange
    if (OldIndex != index) {
      this.onChange(value, index, label, OldValue, OldIndex);
    }
    if (this.state.isOpen) {
      this.setOpen(false);
    }
  },
  onChange(value, index,label, OldValue, OldIndex){
    if (typeof this.props.onChange == 'function') {
      this.props.onChange.apply(null, arguments);
    }
    return;
  },
  onSelect(value, index, label){
    if (typeof this.props.onSelect == 'function') {
      this.props.onSelect.apply(null, arguments);
    }
    return;
  },
  setOpen(isOpen) {
    var newState = this.state;
    newState.isOpen = isOpen;
    this.setState(newState);
  },
  getInitialState(){
    return {
      isOpen: false,
      index: this.props.index,
      value: this.props.value,
      label: this.props.label
    };
  },

  toggleDropMenu(e) {
    let isOpen = !this.state.isOpen;
    this.setOpen(isOpen);
  },

  getScrollHeight() {
    var liHeight = 34;
    var scrollNum = this.props.scrollNum;
    if (!scrollNum) {
      return '280px';//默认值
    } else {
      return `${(scrollNum * liHeight + 8)}px`;
    }
  },

  getHtml() {
    return this.props.options.map((option, index)=> {
      return (
        <SelectorListItem
          value={option.value}
          label={option.label}
          index={index}
          selected={this.state.index == index}
          onSelect={this.setValue}
          />
      );
    })
  },
  getSelectorClass(){
    return `widget-selector  ${this.props.theme} ${this.props.direction || 'down'} ${this.state.isOpen ? 'show' : ''} }`;
  },

  getSelectorScrollViewStyle: function () {
    return {
      width: "auto",
      maxHeight: this.getScrollHeight(),
      overflowY: "scroll"
    }
  },

  render() {
    return (
      <span className={this.getSelectorClass()} style={{width: 'auto'}} onblur={this.toggleDropMenu}>
          <em className="w-show-sel" onClick={this.toggleDropMenu}>
            {this.state.label || this.props.label || '请点击此处展开下拉列表选择'}
          </em>
          <span className="w-arr"></span>
          <ul className="w-lists">
            <div className="scroll-view" style={this.getSelectorScrollViewStyle()}>
              {this.getHtml()}
            </div>
          </ul>
      </span>
    );
  }
});

module.exports = Selector;


