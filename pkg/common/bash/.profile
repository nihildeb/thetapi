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

if [ -d /usr/local/lib/node/bin ] ; then
    PATH=/usr/local/lib/node/bin:$PATH
fi

if [[ $XDG_VTNR -eq 1 && -f /etc/rpi-issue ]]; then
  echo 'RPI Auto Exec'
  if ! [ -n "$TMUX" ]; then
    tmux new-session -s console -n 'Console' -d
    tmux split-window -h
    tmux send-keys -t console:Console.1 'tail -n1 -f /var/log/messages \
      /var/log/syslog \
      /var/log/kern.log &
      ' C-j
    tmux send-keys -t 0 'nmon' C-j
    tmux send-keys -t 0 'cnmdt'
    tmux attach -t console
  fi
fi

if [[ ! $DISPLAY && $XDG_VTNR -eq 1 && ! -f /etc/rpi-issue ]]; then
  exec startx
fi
