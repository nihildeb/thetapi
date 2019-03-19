#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$( dirname $( readlink -f "$0" ) )

case $1 in
	"asd")
		echo "asd installed"
		;;
	*)
		$STOW -d $PKGDIR -t $HOME $1
		;;
esac

echo "PKGDIR $PKGDIR"
