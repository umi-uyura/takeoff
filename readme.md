Takeoff
====================

Support upload to TestFlight from CLI.

Install
--------------------

    $ git clone git://github.com/umi-uyura/takeoff.git
    $ npm install ./takeoff -g

Provisioning
--------------------

1. Copy `takeoff.json` to your project root directory.
2. Edit `takeoff.json`.

### takeoff.json

#### appname

Project name.

#### api_token

Get from https://www.testflightapp.com/account/#api .

#### team_token

Get from https://www.testflightapp.com/dashboard/team/edit/ .

#### distribution_lists

Optional, comma separated distribution list names which will receive access to the build.

#### notify

Optional, notify permitted teammates to install the build (defaults to False).

#### replace

Optional, replace binary for an existing build if one is found with the same name/bundle version (defaults to False).

Usage
--------------------

After Xcode or Android SDK build, run the following command.

    $ takeoff -p <platform> -n <notes>
    
_platform_: **ios** or **android**.  
_notes_: release notes for the build.

Other options is see:

    $ takeoff -h

License
--------------------
Licensed under the [MIT license][MIT].  

[MIT]: http://www.opensource.org/licenses/mit-license.php
