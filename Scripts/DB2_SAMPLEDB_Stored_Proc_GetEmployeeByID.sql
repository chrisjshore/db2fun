CREATE OR REPLACE PROCEDURE GETEMPLOYEEBYID(IN ID INTEGER)
DYNAMIC RESULT SETS 1
P1: BEGIN 
	DECLARE C1 CURSOR WITH RETURN
	FOR SELECT EMPNO, LASTNAME, FIRSTNME, SEX, WORKDEPT, JOB, SALARY 
	FROM EMPLOYEE
	WHERE EMPNO = ID;
OPEN C1;
END P1