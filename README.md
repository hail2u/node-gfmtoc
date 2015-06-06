gfmtoc
======

The GitHub flavored Markdown ToC generator.

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


LICENSE
-------

MIT: http://hail2u.mit-license.org/2014
