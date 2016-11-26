-- views
Alter VIEW `UserActivityDetail` AS
select Activity.activityId,activityTitle,activityDesc,activityDate,activityTime,activityLat,activityLong,activityPos,UserActivity.signed,UserActivity.userId,UserActivity.type
from Activity join UserActivity on Activity.activityId=UserActivity.activityId;

CREATE VIEW `ActivityTagDetail` AS
select ActivityTag.activityId,Tag.tagId,tagName 
from Tag join ActivityTag on Tag.tagId=ActivityTag.tagId;



-- raised
select * from UserActivityDetail where userId=? and type='0';

-- attended
select * from UserActivityDetail where userId=? and type='1';

-- pushed
select * from UserActivityDetail where userId<>'1' and type='2';

-- 根据activityId取tags
select tagName from activitytagdetail where activityId=?;

-- 创建activity
insert into Activity(activityTitle,activityDesc,activityDate,activityTime,activityLat,activityLong,activityPos)
values('1','1','2010','11','11','11','xx');
-- values(?,?,?,?,?,?,?);
select activityId from Activity order by activityId desc limit 1;
insert into UserActivity(activityId,userId,type,signed)
values('14','1','0','0');
-- values(?,?,?,?);

insert into UserActivity(activityId,userId,type,signed)
values(?,?,'2','0');

-- 参加活动
update UserActivity set type='1' where userId=? and activityId=?;


-- 签到
update UserActivity set signed='1' where userId=? and activityId=? 
