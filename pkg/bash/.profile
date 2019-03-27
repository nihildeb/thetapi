# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
      . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

if [[ ! $DISPLAY && $XDG_VTNR -eq 1 && -f /etc/rpi-issue ]]; then
  exec startx
  #exec tail -F \
    #/var/log/kern.log \
    #/var/log/messages \
    #/var/log/syslog \
    #/var/log/nginx/access.log \
    #/var/log/nginx/error.log
fi

if [[ ! $DISPLAY && $XDG_VTNR -eq 1 && ! -f /etc/rpi-issue ]]; then
  xset -dpms
  xset s off
  exec startx
fi
