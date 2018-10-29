#!/bin/bash
# Holochain 3 identity scenario

cd build

bs --port 4040 &
HCLOG_DHT_ENABLE=1 hcdev --execpath holo-identities/.identity3 --bootstrapServer 127.0.0.1:4040 --agentID bob@local --DHTport 4043 web 4143 &
HCLOG_DHT_ENABLE=1 hcdev --execpath holo-identities/.identity2 --bootstrapServer 127.0.0.1:4040 --agentID jane@local --DHTport 4042 web 4142 &
HCLOG_DHT_ENABLE=1 hcdev --execpath holo-identities/.identity1 --bootstrapServer 127.0.0.1:4040 --agentID john@local --DHTport 4041 web 4141 &

read -n 1 -s -r -p "Press any key to cancel"


case "$(uname -s)" in
  Darwin)
    ps -ef | grep hcdev | grep -v grep | awk '{print $2}' | xargs kill
    ps -ef | grep bs | grep -v grep | awk '{print $2}' | xargs kill
    ;;

  Linux)
    ps -ef | grep hcdev | grep -v grep | awk '{print $2}' | xargs kill
    ps -ef | grep bs | grep -v grep | awk '{print $2}' | xargs kill
    ;;

  CYGWIN*|MINGW32*|MSYS*|MINGW64*)
    taskkill //F //IM hcdev.exe
    taskkill //F //IM bs.exe
    ;;
  *)
    echo 'other OS TODO' 
    ;;
esac

rm -rf holo-identities

cd ..

