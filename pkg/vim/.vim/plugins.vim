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

" Emmet
" <c-y>,
Plugin 'mattn/emmet-vim'

" CtrlP
Plugin 'ctrlpvim/ctrlp.vim'
let g:ctrlp_show_hidden = 1
let g:ctrlp_custom_ignore = 'node_modules\|^\.DS_Store\|^\.git\|bundle\|public\|resources'
let g:ctrlp_working_path_mode = ''

Plugin 'w0rp/ale'
"let g:ale_fixers = {'javascript': ['prettier', 'eslint']}
let g:ale_linters = {'javascript': ['eslint']}
let g:ale_fixers = {'javascript': ['eslint']}
let g:ale_fix_on_save = 1
"let g:ale_set_loclist = 0
"let g:ale_set_quickfix = 1

" NERDTree
Plugin 'scrooloose/nerdtree'
let g:NERDTreeWinPos = "right"
let NERDTreeShowHidden=0
let NERDTreeIgnore = ['\.pyc$', '__pycache__']
let g:NERDTreeWinSize=35
map <leader>\ :NERDTreeToggle<CR>
"let g:NERDTreeDirArrows=0

" https://github.com/scrooloose/nerdcommenter
" <leader>cc and <leader>cu
Plugin 'scrooloose/nerdcommenter'

"Plugin 'valloric/youcompleteme'
"disable shitty preview window since it never closes
"this thing is the best completion but a PitA to build
"set completeopt-=preview
"let g:ycm_global_ycm_extra_conf = "~/.vim/.ycm_extra_conf.py"

" Second best option for completions, and is native vim
Plugin 'ervandew/supertab'

" Airline
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
let g:airline_theme = 'solarized'
let g:airline_solarized_bg='dark'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

