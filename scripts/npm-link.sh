#/bin/bash
cd packages
list=`ls .`
if [ "$1" = "unlink" ];then
  for path in $list
  do
    cd $path
    yarn unlink
    cd ..
  done
else
  for path in $list
  do
    cd $path
    yarn link
    cd ..
  done
fi
