CREATE OR REPLACE PROCEDURE GETEMPLOYEECOUNT(OUT VARCOUNT INTEGER)
P1: BEGIN
	SELECT COUNT(*) INTO VARCOUNT FROM EMPLOYEE;
END P1