select routineschema as schema_name,
       routinename as procedure_name,
       case origin
            when 'E' then 'User-defined, external'
            when 'F' then 'Federated procedure'
            when 'U' then 'User-defined, based on a source'
            when 'Q' then 'SQL-bodied'
            end as origin,
       parm_count as parameters,
       language,
       text
from syscat.routines
where routinetype = 'P'
    and routineschema not like 'SYS%'
order by schema_name,
         procedure_name;