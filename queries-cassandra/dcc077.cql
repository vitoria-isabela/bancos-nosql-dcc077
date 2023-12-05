SELECT COUNT(*) FROM nyc_taxi.trip_data;

SELECT * FROM nyc_taxi.trip_data WHERE id = 'id1301050';

SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 ALLOW FILTERING;

SELECT * FROM nyc_taxi.trip_data WHERE passenger_count > 2 ALLOW FILTERING;

SELECT * FROM nyc_taxi.trip_data WHERE trip_duration > 200 ALLOW FILTERING;

SELECT * FROM nyc_taxi.trip_data WHERE id IN ('id3047600', 'id1378513', 'id3858529');

SELECT * FROM nyc_taxi.trip_data WHERE id IN ('id2379040', 'id3888028');

SELECT * FROM nyc_taxi.trip_data WHERE id = (SELECT MAX(id) FROM nyc_taxi.trip_data);

SELECT COUNT(*) FROM nyc_taxi.trip_data WHERE store_and_fwd_flag = 'Y' ALLOW FILTERING;

SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 ALLOW FILTERING;

SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 AND passenger_count > 2 ALLOW FILTERING;