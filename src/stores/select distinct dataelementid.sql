select distinct dataelementid,
  dv.sourceid,
  value
from datavalue dv
  inner join dataelement de using(dataelementid)
  inner join organisationunit o on(o.organisationunitid = dv.sourceid)
  inner join datasetsource ds on(ds.sourceid = o.organisationunitid)
  inner join dataset d using(datasetid)
where d.uid = 'JWRFNJnxlvY';
select sum(value)
from (
    select distinct on(dv.sourceid) dv.value::INTEGER
    from datavalue dv
      inner join dataelement de using(dataelementid)
      inner join organisationunit o on(o.organisationunitid = dv.sourceid)
      inner join datasetsource ds on(ds.sourceid = o.organisationunitid)
      inner join dataset d using(datasetid)
    where d.uid = 'JWRFNJnxlvY'
      and de.uid = 'NPtjF45ruWX'
      and o.path ~ 'akV6429SUqu'
      and dv.deleted = false
    order by dv.sourceid,
      dv.storedby
  ) as query;
WITH summary AS (
  select dv.sourceid, dv.value::INTEGER
  from datavalue dv
    inner join dataelement de using(dataelementid)
    inner join organisationunit o on(o.organisationunitid = dv.sourceid)
    inner join datasetsource ds on(ds.sourceid = o.organisationunitid)
    inner join dataset d using(datasetid)
  where d.uid = 'JWRFNJnxlvY'
    and de.uid = 'NPtjF45ruWX'
    and o.path ~ 'akV6429SUqu'
    and dv.deleted = false
)
SELECT *
FROM summary
WHERE rank = 1