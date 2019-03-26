#!/bin/sh

countdown()
(
  IFS=:
  set -- $*
  secs=$(( ${1#0} * 3600 + ${2#0} * 60 + ${3#0} ))
  while [ $secs -gt 0 ]
  do
    sleep 1 &
    printf "\r%02d:%02d:%02d" $((secs/3600)) $(( (secs/60)%60)) $((secs%60))
    secs=$(( $secs - 1 ))
    wait
  done
  echo
)

# Theta Pi
alias cdt="cd ${THETAPI_HOME}"
alias update="${THETAPI_HOME}/bin/update"
alias tp_git_ssh='git remote set-url --push origin git@github.com:nihildeb/thetapi'
alias tp_git_http='git remote set-url --push origin https://github.com/nihildeb/thetapi'
alias reshell=". ${HOME}/.profile"
alias reboot="rm -f ${THETAPI_HOME}/.rebootreq && sudo reboot"
alias pi='ssh pi@192.168.3.14'
alias pi2='ssh pi@192.168.3.15'
alias alpi='ssh root@192.168.178.48'
alias timer=countdown $@

# deb / rasp system
alias flush='dscacheutil -flushcache'
alias cls='clear'
alias h='history'
alias bios='sudo systemctl reboot --firmware-setup'
alias sleep_monitor='sleep 1; xset dpms force off'
alias dump='sudo tcpdump -i eth0 -s 1500 port not 22 and port not 53 and port not 1900 and port not https and port not http and port not socks'
alias hug='hugo server --bind 0.0.0.0 --cleanDestinationDir -p 8080 -wD'
alias keyls='xmodmap -pke'
alias keyshow='xev'

alias bios='sudo systemctl reboot --firmware-setup'
alias monitor_sleep='sleep 1; xset dpms force off'
alias psa='ps ax'
alias psag='ps ax|grep -i $@'
alias sshpi='ssh root@192.168.178.48'
alias pi='ssh pi@192.168.3.14'

# hugo
alias hug='hugo server --bind 0.0.0.0 --cleanDestinationDir -p 8080 -wD'
alias hugod='sudo hugo server -p 80 -wD'
alias tre='tree ~/site/content; tree ~/site/layouts'

# i3
alias keyls='xmodmap -pke'
alias keyshow='xev'

# List directory contents
alias sl=ls
alias la='ls -AF'       # Compact view, show hidden
alias ll='ls -al'
alias l='ls -a'
alias l1='ls -1'

# list processes
alias psa='ps ax'
alias psag='ps ax|grep -i $@'

# Shortcuts to edit startup files
alias vbr="vim ~/.bashrc"
alias vbp="vim ~/.bash_profile"
alias vba="vim ~/.bash_aliases"
alias vbv="vim ~/.vimrc"
alias vimrc='vim ~/.vimrc'

# cd
alias ..='cd ..'         # Go up one directory
alias cd..='cd ..'       # Common misspelling for going up one directory
alias ...='cd ../..'     # Go up two directories
alias ....='cd ../../..' # Go up three directories
alias -- -='cd -'        # Go back

# Directory
alias md='mkdir -p'
alias rd='rmdir'

# git
alias gcl='git clone'
alias ga='git add'
alias grm='git rm'
alias gap='git add -p'
alias gall='git add -A'
alias gf='git fetch --all --prune'
alias gft='git fetch --all --prune --tags'
alias gfv='git fetch --all --prune --verbose'
alias gftv='git fetch --all --prune --tags --verbose'
alias gus='git reset HEAD'
alias gpristine='git reset --hard && git clean -dfx'
alias gclean='git clean -fd'
alias gm="git merge"
alias gmv='git mv'
alias g='git'
alias get='git'
alias gst='git status'
alias gs='git status'
alias gss='git status -s'
alias gsu='git submodule update --init --recursive'
alias gl='git pull'
alias glum='git pull upstream master'
alias gpr='git pull --rebase'
alias gpp='git pull && git push'
alias gup='git fetch && git rebase'
alias gp='git push'
alias gpo='git push origin'
alias gpu='git push --set-upstream'
alias gpuo='git push --set-upstream origin'
alias gpom='git push origin master'
alias gr='git remote'
alias grv='git remote -v'
alias gra='git remote add'
alias gd='git diff'
alias gdv='git diff -w "$@" | vim -R -'
alias gc='git commit -v'
alias gca='git commit -v -a'
alias gcm='git commit -v -m'
alias gcam="git commit -v -am"
alias gci='git commit --interactive'
alias gb='git branch'
alias gba='git branch -a'
alias gbt='git branch --track'
alias gbm='git branch -m'
alias gbd='git branch -d'
alias gbD='git branch -D'
alias gcount='git shortlog -sn'
alias gcp='git cherry-pick'
alias gco='git checkout'
alias gcom='git checkout master'
alias gcb='git checkout -b'
alias gcob='git checkout -b'
alias gct='git checkout --track'
alias gexport='git archive --format zip --output'

# systemctl
case $OSTYPE in
    linux*)
  alias sc='systemctl'
  alias scr='systemctl daemon-reload'
  alias scu='systemctl --user'
  alias scur='systemctl --user daemon-reload'
  alias sce='systemctl stop'
  alias scue='systemctl --user stop'
  alias scs='systemctl start'
  alias scus='systemctl --user start'
    ;;
esac

# todo
alias tls="$TODO ls"
alias ta="$TODO a"
alias trm="$TODO rm"
alias tdo="$TODO do"
alias tpri="$TODO pri"
