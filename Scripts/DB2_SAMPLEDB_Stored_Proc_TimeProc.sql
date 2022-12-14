CREATE OR REPLACE PROCEDURE TIMEPROC(OUT TDIFF INTEGER)
P1: BEGIN
	DECLARE TSTART TIMESTAMP;
	DECLARE TSTOP TIMESTAMP;
	SET TSTART = CURRENT TIMESTAMP;
	CALL GETALLEMPLOYEES();
	SET TSTOP = CURRENT TIMESTAMP;
	SET TDIFF = TIMESTAMPDIFF(1, TSTOP - TSTART);
END P1
