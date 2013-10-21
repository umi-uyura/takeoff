/**
 * Takeoff
 */

"use strict";

var commander = require("commander"),
    exec = require("child_process").exec,
    path = require("path"),
    fs = require("fs");

commander
  .version("0.0.1")
  .description("TestFlight support tool")
  .option("-p, --platform <platform>", "select platform [ios, android]", String)
  .option("-n, --notes <notes>", "release notes for the build", String)
  .option("-N, --notify", "notify permitted teammates to install build")
  .option("-R, --replace", "replace binary for an existing build if one is found with the same name/bundle version")
  .option("-T, --target <target>", "*IOS ONLY* target to build for: device, dist-appstore, dist-adhoc", String)
  .parse(process.argv);

if (2 >= process.argv.length) commander.help();

var provision_path = path.resolve("takeoff.json");

if (!fs.existsSync(provision_path)) {
  console.log("ERROR: takeoff.json not found!");
  process.exit(0);
}

var fields = require(provision_path);

if ("ios" !== commander.platform && "android" !== commander.platform) {
  console.log("ERROR: unknown platform '" + commander.platform + "'");
  process.exit(0);
}

fields.target = (commander.target ? commander.target : "device");
if (commander.notify) fields.notify = true;
if (commander.replace) fields.replace = true;

var request = "";
if (fields.api_token) request += " -F api_token=\'" + fields.api_token + "\'";
if (fields.team_token) request += " -F team_token=\'" + fields.team_token + "\'";
if (fields.distribution_lists) request += " -F distribution_lists=\'" + fields.distribution_lists + "\'";
if (fields.notify) request += " -F notify=True";
if (fields.replace) request += " -F replace=True";

if ("ios" === commander.platform) {
  var ios_path = "build/iphone/build/";
  ios_path += /^simulator|device$/.test(fields.target) ? "Debug" : "Release";
  ios_path += "-";
  ios_path += "simulator" === fields.target ? "iphonesimulator" : "iphoneos";
  ios_path += "/";
  request += " -F file=@" + ios_path + fields.appname + ".ipa";
} else if ("android" === commander.platform) {
  request += " -F file=@build/android/bin/app.apk";
}

if (commander.notes) {
  request += " -F notes=\'" + commander.notes + "\'";
} else {
  request += " -F notes=\'Build upload from Takeoff.\'";
}

exec("curl http://testflightapp.com/api/builds.json " + request, function(err, stdout, stderr) {
  if (stderr) {
    console.log(stderr);
    console.log("");
  }

  console.log(stdout);
});
