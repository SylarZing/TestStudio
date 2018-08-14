#Add Teacher by the UserName

CREATE PROCEDURE `sp_AddTeacher` (
	in strUserName varchar(255),
    in strPhone varchar(20),
    in strEmail varchar(255),
    in strPassword varchar(255),
    in iUserType int(11),
    in bIsActive bit(1),
    in strTeacherName varchar(255),
    out UserID int(11))
BEGIN

	if (select count(*) from T_USER where UserName = strUserName > 0) THEN
		set @UserID = -1;
    else
		insert into T_USER (UserName, Phone, Email, Password, UserType, IsActive) 
					values (strUserName, strPhone, strEmail, strPassword, iUserType, bIsActive);
		set @UserID = (select ID from T_USER where UserName = strUserName);
        insert into T_TEACHER (ID, Name)
					values (UserID, strTeacherName);
	end if;

END
