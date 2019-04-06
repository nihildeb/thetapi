
" Better command-line completion
set wildmenu
set wildmode=list:full
set listchars=trail:~,extends:>,precedes:<
set list

" Folding
set nofoldenable

" autocomplete css
filetype plugin on
set omnifunc=syntaxcomplete#Complete

augroup vimrc
  au BufReadPre * setlocal foldmethod=indent
  au BufWinEnter * if &fdm == 'indent' | setlocal foldmethod=manual | endif
augroup END

nnoremap <silent> <Space> @=(foldlevel('.')?'za':"\<Space>")<CR>
vnoremap <Space> zf

" Show partial commands
set showcmd

" Line Numbers
set number

" Quickly time out on keycodes, but never time out on mappings
set notimeout ttimeout ttimeoutlen=200

" Indentation settings for using 2 spaces instead of tabs.
" Do not change 'tabstop' from its default value of 8 with this setup.
set shiftwidth=2
set tabstop=2
set softtabstop=2
set expandtab

" builtin markdown by tpope supports fenced code blocks
" https://github.com/tpope/vim-markdown
let g:markdown_fenced_languages = ['html', 'javascript', 'bash=sh']

" vim spell check
" https://thoughtbot.com/blog/vim-spell-checking
autocmd BufRead,BufNewFile *.md setlocal spell
set complete+=kspell
" don't litter, I don't use network drives
let g:netrw_dirhistmax = 0

"Apply highlighting automatically whenever text exceeds 80 columns
":au BufWinEnter * let w:m2=matchadd('ErrorMsg', '\%>80v.\+', -1)
hi colorcolumn ctermbg=NONE ctermfg=red
set cc=80

" Map <C-L> (redraw screen) to also turn off search highlighting until the
" next search
nnoremap <C-L> :nohl<CR><C-L>

" remap C-w to get out of Chrome's way
" (running ChromeOS with chroot shell in a Chrome tab
nnoremap <C-Q> <C-W>

" fast finger recovery
command! W :w

" Ctrl-S
" requires extra magic on OSX
" https://stackoverflow.com/questions/3446320/in-vim-how-to-map-save-to-ctrl-s
noremap <silent> <C-S>          :update<CR>
vnoremap <silent> <C-S>         <C-C>:update<CR>
inoremap <silent> <C-S>         <C-O>:update<CR>

" nav buffers F1, F2
noremap <F1> :bp<CR>
inoremap <F1> <Esc>:bp<CR>
noremap <F2> :bn<CR>
inoremap <F2> <Esc>:bn<CR>

" To insert timestamp, press F3.
nmap <F3> a<C-R>=strftime("%Y-%m-%d %a %I:%M %p")<CR><Esc>
imap <F3> <C-R>=strftime("%Y-%m-%d %a %I:%M %p")<CR>

" F4 searches current word recursively
map <F4> :execute "vimgrep /" . expand("<cword>") . "/j app/** config/** src/**" <Bar> cw<CR>

" F5 cleans all trailing whitespace and clear highlighting
nnoremap <silent> <F5> :retab<Bar>:let _s=@/<Bar>:%s/\s\+$//e<Bar>:let @/=_s<Bar>:nohl<CR>

" Use <F7> to toggle between 'paste' and 'nopaste'
set pastetoggle=<F7>



