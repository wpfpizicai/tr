CREATE TABLE IF NOT EXISTS `think_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `pwd` char(41) NOT NULL,
  `email` char(100) NOT NULL,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

LOCK TABLES `think_user` WRITE;

INSERT INTO `think_user` (`id`, `name`, `pwd`, `email`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3','tjuwpf@163.com'),
(2, 'admin2', '21232f297a57a5a743894a0e4a801fc3','tjuwpf2@163.com'),
(3, 'admin3', '21232f297a57a5a743894a0e4a801fc3','tjuwpf3@163.com'),
(4, 'admin4', '21232f297a57a5a743894a0e4a801fc3','tjuwpf4@163.com');

UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `think_course` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `overview` TEXT CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

LOCK TABLES `think_course` WRITE;

INSERT INTO `think_course` (`id`, `title`, `overview`, `img`) VALUES
(1, '微观经济学', '微观经济学是现代经济学的一个分支，主要以单个经济单位（单个生产者、单个消费者、单个市场经济活动）作为研究对象分析的一门学科。 微观经济学是研究社会中单个经济单位的经济行为，以及相应的经济变量的单项数值如何决定的经济学说。亦称市场经济学或价格理论。','http://a.hiphotos.baidu.com/baike/w%3D268/sign=184f172e269759ee4a5067cd8afa434e/2934349b033b5bb5d95f53dd36d3d539b600bc0c.jpg'),
(2, '宏观经济学', '宏观经济学（Macroeconomics），是使用国民收入、经济整体的投资和消费等总体性的统计概念来分析经济运行规律的一个经济学领域。宏观经济学是相对于古典的微观经济学而言的。宏观经济学是约翰·梅纳德·凯恩斯的《就业、利息和货币通论》发表以来快速发展起来的一个经济学分支。','http://c.hiphotos.baidu.com/baike/w%3D268/sign=f05b99cf728da9774e2f812d8853f872/562c11dfa9ec8a13d9ec0d1cf603918fa1ecc05c.jpg'),
(3,'财务会计','财务会计指通过对企业已经完成的资金运动全面系统的核算与监督，以为外部与企业有经济利害关系的投资人、债权人和政府有关部门提供企业的财务状况与盈利能力等经济信息为主要目标而进行的经济管理活动。财务会计是现代企业的一项重要的基础性工作，通过一系列会计程序，提供决策有用的信息，并积极参与经营管理决策，提高企业经济效益，服务于市场经济的健康有序发展。','http://d.hiphotos.baidu.com/baike/w%3D268/sign=189ac19eb1119313c743f8b65d390c10/4ec2d5628535e5ddacc8aa8375c6a7efcf1b6281.jpg');

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS `think_user_course` (
  `userid` int(10) NOT NULL,
  `courseid` int(10) NOT NULL,
  FOREIGN KEY (`userid`) references think_user(`id`),
  FOREIGN KEY (`courseid`) references think_course(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

LOCK TABLES `think_user_course` WRITE;

INSERT INTO `think_user_course` (`userid`, `courseid`) VALUES (1,1),(1,2),(2,2),(3,1);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS `think_teacher` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `overview` TEXT NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `think_partner` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `overview` TEXT NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `think_course_teacher` (
  `id` int(10) NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `overview` TEXT NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;









{
    "data": {
        "detail": [{
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426230489163,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "chrome",
            "os": "windows 7",
            "device_brand": "其它",
            "device_version": "其它",
            "device_type": "pc",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&from=login'>http://tongji.cnzz.com/main.php?c=site&a=show&from=login'>http://tongji.cnzz.com/main.php?c=site&a=show&from=login'>http://tongji.cnzz.com/main.php?c=site&a=show&from=login",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843'>http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-13",
            "hour": "2015-03-13 15",
            "minute": "2015-03-13 15:08",
            "properties": [{
                "field_name": "c",
                "text_value": "site"
            }, {
                "field_name": "a",
                "text_value": "overview"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170524622,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "safari",
            "os": "nomatch",
            "device_brand": "iPhone",
            "device_version": "iPhone OS",
            "device_type": "手机",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=flow&a=frame&siteid=1254488320",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:28",
            "properties": [{
                "field_name": "c",
                "text_value": "visitor"
            }, {
                "field_name": "a",
                "text_value": "type"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170400860,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "safari",
            "os": "nomatch",
            "device_brand": "iPhone",
            "device_version": "iPhone OS",
            "device_type": "手机",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=cont&a=frame&siteid=1254488320'>http://tongji.cnzz.com/main.php?c=cont&a=frame&siteid=1254488320",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:26",
            "properties": [{
                "field_name": "c",
                "text_value": "flow"
            }, {
                "field_name": "a",
                "text_value": "trend"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170388064,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "safari",
            "os": "nomatch",
            "device_brand": "iPhone",
            "device_version": "iPhone OS",
            "device_type": "手机",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=frame&siteid=1254488320'>http://tongji.cnzz.com/main.php?c=site&a=frame&siteid=1254488320",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:26",
            "properties": [{
                "field_name": "c",
                "text_value": "cont"
            }, {
                "field_name": "a",
                "text_value": "page"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170359660,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "safari",
            "os": "nomatch",
            "device_brand": "iPhone",
            "device_version": "iPhone OS",
            "device_type": "手机",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=cont&a=frame&siteid=1254488320",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:25",
            "properties": [{
                "field_name": "c",
                "text_value": "visitor"
            }, {
                "field_name": "a",
                "text_value": "districtnet"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170274617,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "safari",
            "os": "nomatch",
            "device_brand": "iPhone",
            "device_version": "iPhone OS",
            "device_type": "手机",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=frame&siteid=1254488320",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:24",
            "properties": [{
                "field_name": "c",
                "text_value": "cont"
            }, {
                "field_name": "a",
                "text_value": "page"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426170198670,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "chrome",
            "os": "windows 7",
            "device_brand": "",
            "device_version": "",
            "device_type": "pc",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&from=login",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 22",
            "minute": "2015-03-12 22:23",
            "properties": [{
                "field_name": "c",
                "text_value": "site"
            }, {
                "field_name": "a",
                "text_value": "overview"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1426132853091,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "chrome",
            "os": "windows 7",
            "device_brand": "",
            "device_version": "",
            "device_type": "pc",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&from=login",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-12",
            "hour": "2015-03-12 12",
            "minute": "2015-03-12 12:00",
            "properties": [{
                "field_name": "c",
                "text_value": "site"
            }, {
                "field_name": "a",
                "text_value": "overview"
            }]
        }, {
            "event_name": "菜单监控",
            "distinct_id": "14be8a8bbf5b5-01a0e5d9-464f0321-1fa400-14be8a8bbf6182",
            "token": "c715dc981aabb45190b2",
            "time": 1425981359426,
            "ip": "122.225.222.227",
            "country": "中国",
            "region": "浙江省",
            "city": "杭州市",
            "browser": "chrome",
            "os": "windows 7",
            "device_brand": "",
            "device_version": "",
            "device_type": "pc",
            "screen_width": 1920,
            "screen_height": 1080,
            "referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&from=login",
            "referrer_domain": "tongji.cnzz.com",
            "initial_referrer": "http://tongji.cnzz.com/main.php?c=site&a=show&siteid=1254273843",
            "initial_referrer_domain": "tongji.cnzz.com",
            "search_engine": "",
            "keyword": "",
            "ali_lib": "web",
            "utm_source": "",
            "utm_medium": "",
            "utm_term": "",
            "utm_content": "",
            "utm_campaign": "",
            "date": "2015-03-10",
            "hour": "2015-03-10 17",
            "minute": "2015-03-10 17:55",
            "properties": [{
                "field_name": "c",
                "text_value": "site"
            }, {
                "field_name": "a",
                "text_value": "overview"
            }]
        }]
    },
    "total": 9
}