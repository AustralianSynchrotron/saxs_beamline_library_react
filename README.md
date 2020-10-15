# SAXS Beamline React Based GUI

This is the react based Web GUI specifically for the SAXS/WAXS beamline at the Australian Synchrotron. As it is bespoke code expect there to be some hardcoded elements and room for generalisation. It is not intended as a code to be installed and use generally, but to demonstrate various approaches and solutions to create a working (in production) Browser Based beamline interface that interacts with the bluesky](https://blueskyproject.io) stack.

## Communication
Communication with the python backend is achieved via HTTP (RESTful) Requests and Websockets, using custom Middleware. Websockets are used strictly for asynchronous responses from the backend with all messaging to the backend via HTTP.
Interaction and subscriptions with Ophyd signals is achieved using the _library address_ of the signal/device. The _library address_ is the location of the signal in the library of the form `<module1>.<module2>...<module#>.<attribute1>.<attribute2>...<attribute#>`. E.g., x `"saxs_motors.sample_table.z"` is the address for the z motor of the sample table.

