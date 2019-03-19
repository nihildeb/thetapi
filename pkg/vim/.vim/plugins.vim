set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'

Plugin 'altercation/vim-colors-solarized'

" https://github.com/pangloss/vim-javascript                                                                                              
" js indenting. also does syntax, but this config uses jshint from syntastic    
Plugin 'pangloss/vim-javascript'                                                
                                                                                
" https://vimawesome.com/plugin/markdown-syntax                                 
Plugin 'plasticboy/vim-markdown'    

" CtrlP
Plugin 'ctrlpvim/ctrlp.vim'
let g:ctrlp_show_hidden = 1







" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
