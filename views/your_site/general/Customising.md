# Customising

How to change the look of your site

## Label

In the navbar, there's that button that links to the contents.
Because different people would use emudocs for different things, you can change the text on that button quite easily. Just go to `./views/special/contents-label.txt` and change the text to what you want.

## Templates

Located in ./views/your_site/special

Built in ejs, see [their documentation](https://www.ejs.co)

### homepage.ejs

The homepage.

dynamic content:

-   **navbar**
    The navbar in raw html. Rendered in from header.ejs<br>
    All pages have their css in the navbar as well.

### header.ejs

The partial that contains the navbar and css of every page.

dynamic content:

-   **data**
    A random thing that does nothing.
-   **dl**
    That label for the nav link mentioned earlier (the contents of special/contents-label.txt)

### contents.ejs

The contents page.

dynamic content:

-   **navbar**
    The navbar in raw html. Rendered in from header.ejs<br>
    All pages have their css in the navbar as well.
-   **pages**
    An object containing a list of pages and their urls.
    It's in the following structure:
    ```
    [{
        name: "page1",
        url: "/path/to/page1.html"
    },
    [{
        name: "page2",
        url: "/path/to/page2.html"
    },
    ]
    ```

### page.ejs

The articles on your site.

dynamic content:

-   **navbar**
    I'm sure you understand this by now.
-   **content**
    The raw html generated from that page's markdown.
-   **pages**
    An object containing a list of pages and their urls.
-   **pname**
    The name of the current page you are on.
