gfmtoc
======

The GitHub flavored Markdown ToC generator.


NOTE
----

I don’t want to publish this npm packge to npm registry.


INSTALL
-------

    $ git clone https://github.com/hail2u/gfmtoc.git
    $ npm install
    $ npm link


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

    $ mdtoc foo.md

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
