# Determine if we are Windows (Cygwin)
KERNEL=`uname -s`
if [ $KERNEL == "CYGWIN_NT-6.1-WOW64" ]; then
    PHANTOMJS_EXECUTABLE=lib/phantomjs-win/phantomjs.exe
else
    PHANTOMJS_EXECUTABLE=lib/phantomjs-macosx/bin/phantomjs
fi

# Define default variables
CASPERJS_BOOTSTRAP=lib/casperjs/bin/bootstrap.js
SPEC=tests/suites

USAGE="Usage: $0 [options]\n\nwhere options include:\n
\t-s [<directory> | <spec>]\n
\t\tPath to a directory of specs or path to a spec file.\n
\t\tDefault: '$SPEC'.\n"

# Parse command line options
while getopts hls:u: OPT; do
  case "$OPT" in
    h)
      echo -e $USAGE
      exit 0
      ;;
    s)
      SPEC=$OPTARG
      ;;
    \?)
      # handle errors
      echo -e $USAGE
      exit 1
      ;;
  esac
done

# Remove the options we parsed above
shift `expr $OPTIND - 1`

# Error if there are arguments without a switch
if [ $# -gt 0 ]; then
  echo $USAGE >&2
  exit 1
fi

./$PHANTOMJS_EXECUTABLE $CASPERJS_BOOTSTRAP \
  --casper-path=lib/casperjs \
  --cli \
  --xunit=results.xml \
  --log-level=debug \
  --direct=true \
  lib/casperjs/tests/run.js $SPEC \
