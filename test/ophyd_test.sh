#!/bin/bash

curl --location --request POST 'http://localhost:8082/api/v1.0/subscriptions' --header 'Content-Type: application/json' --data-raw '{"token": "12348"}' & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.master_shutter_enable?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.white_beam?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.mono_beam?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.sample_shutter?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.beam_on_sample?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.beam_on_fdbk?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.beam_position?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.feedback?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.HFM_feedback?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.VFM_feedback?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.attenuators?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.undulator_gap_status?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.undulator_taper_status?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_scaler.saxs_scaler.beamstop?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_scaler.saxs_scaler.transmission?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_scaler.saxs_scaler.io?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_scaler.saxs_scaler.alt_io?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.dcm_qbpm?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_scaler.saxs_scaler.transmission?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.undulator_gap?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.undulator_taper?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.set_energy?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.energy?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.wavelength?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.echange_ivu_dcm_complete?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.dcm_fine_scan_state?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.scan_pt?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.scan_pts?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_optics.dcm.echange_fb_image_tune?describe=true & \
curl http://localhost:8082/api/v1.0/devices/ophyd_status_devices.ophyd_status.energy_change_message?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_slits.flux.camera_length?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_slits.flux.flux_level?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_slits.flux.percent_flux?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_slits.flux.percent_flux?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_IO.rio0.ao_0?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_IO.rio0.ao_1?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_video.video_cameras.video_camera_1.cam.acquire_time?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_video.video_cameras.video_camera_1.cam.gain?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_video.video_cameras.video_camera_6.cam.acquire_time?describe=true & \
curl http://localhost:8082/api/v1.0/devices/saxs_video.video_cameras.video_camera_6.cam.gain?describe=true & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.master_shutter_enable"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.white_beam"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.mono_beam"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.sample_shutter"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.beam_on_sample"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.beam_on_fdbk"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.beam_position"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.feedback"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.HFM_feedback"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.VFM_feedback"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.attenuators"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.undulator_gap_status"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.undulator_taper_status"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_scaler.saxs_scaler.beamstop"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_scaler.saxs_scaler.transmission"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_scaler.saxs_scaler.io"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_scaler.saxs_scaler.alt_io"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.dcm_qbpm"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.energy"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.wavelength"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.echange_ivu_dcm_complete"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.dcm_fine_scan_state"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.scan_pt"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.scan_pts"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_optics.dcm.echange_fb_image_tune"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["ophyd_status_devices.ophyd_status.energy_change_message"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_slits.flux.camera_length"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_slits.flux.flux_level"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_slits.flux.percent_flux"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_IO.rio0.ao_0"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_IO.rio0.ao_1"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_video.video_cameras.video_camera_1.cam.acquire_time"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_video.video_cameras.video_camera_1.cam.gain"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_video.video_cameras.video_camera_6.cam.acquire_time"]}' & \
curl --location --request PUT 'http://localhost:8082/api/v1.0/subscriptions/12348' --header 'Content-Type: application/json' --data-raw '{"devices": ["saxs_video.video_cameras.video_camera_6.cam.gain"]}'