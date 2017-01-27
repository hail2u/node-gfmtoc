gfmtoc
======

Generate ToC for Markdown text in GitHub Style

<!-- #toc -->

* [INSTALL](#install)
* [USAGE](#usage)
* [LICENSE](#license)

<!-- /toc -->


INSTALL
-------

    $ npm install -g @hail2u/gfmtoc


USAGE
-----

Write `foo.md`:

    Test
    ====
    
    <!-- #toc -->
    <!-- /toc -->
    
    Foo
    ---
    
    ### Foo Foo
    
    ### Foo Bar
    
    Bar
    ---
    
    ### Bar Foo

Then run:

    $ gfmtoc foo.md

Get:

    Test
    ====
    
    <!-- #toc -->
    
    * [Foo](#foo)
      * [Foo Foo](#foo-foo)
      * [Foo Bar](#foo-bar)
    * [Bar](#bar)
      * [Bar Foo](#bar-foo)
    
    <!-- /toc -->
    
    Foo
    ---
    
    ### Foo Foo
    
    ### Foo Bar
    
    Bar
    ---
    
    ### Bar Foo


NOTE
----

[marked][1] v0.3.5 has a bug when parsing a comment along with `----` syntax
(it’s generate `hr`) on Node.js v7.4.0. You should avoid using `----` syntax
just after comment, especially in gfmtoc’s special comment, by adding blank
line(s):

    <!-- #toc -->
    <!-- /toc -->
    
    ----

Or, use `****` for `hr`.


LICENSE
-------

MIT: http://hail2u.mit-license.org/2014


[1]: https://github.com/chjj/marked
