<script>

</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .tree ul {
        padding-top: 20px;
        position: relative;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    .tree li {
        float: left;
        text-align: center;
        list-style-type: none;
        position: relative;
        padding: 20px 5px 0 5px;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }


    .tree li::before,
    .tree li::after {
        content: '';
        position: absolute;
        top: 0;
        right: 50%;
        border-top: 1px solid #ccc;
        width: 50%;
        height: 20px;
    }

    .tree li::after {
        right: auto;
        left: 50%;
        border-left: 1px solid #ccc;
    }

    .tree li:only-child::after,
    .tree li:only-child::before {
        display: none;
    }

    .tree li:only-child {
        padding-top: 0;
    }

    .tree li:first-child::before,
    .tree li:last-child::after {
        border: 0 none;
    }

    .tree li:last-child::before {
        border-right: 1px solid #ccc;
        border-radius: 0 5px 0 0;
        -webkit-border-radius: 0 5px 0 0;
        -moz-border-radius: 0 5px 0 0;
    }

    .tree li:first-child::after {
        border-radius: 5px 0 0 0;
        -webkit-border-radius: 5px 0 0 0;
        -moz-border-radius: 5px 0 0 0;
    }

    .tree ul ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        border-left: 1px solid #ccc;
        width: 0;
        height: 20px;
    }

    .tree li span {
        border: 1px solid #ccc;
        padding: 5px 10px;
        text-decoration: none;
        font-family: arial, verdana, tahoma;
        font-size: 11px;
        display: inline-block;

        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    .tree li span:hover,
    .tree li span:hover+ul li span {
        background: #c8e4f8;
        color: #000;
        border: 1px solid #94a0b4;
    }

    .tree li span:hover+ul li::after,
    .tree li span:hover+ul li::before,
    .tree li span:hover+ul::before,
    .tree li span:hover+ul ul::before {
        border-color: #94a0b4;
    }
</style>

<div class="tree">
    <ul>
        <li>
            <span>bappy</span>
            <ul>
                <li>
                    <span>Child</span>
                    <ul>
                        <li>
                            <span>Grand Child</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <span>Child</span>
                    <ul>
                        <li><span>Grand Child</span></li>
                        <li>
                            <span>Grand Child</span>
                            <ul>
                                <li>
                                    <span>Great Grand Child</span>
                                </li>
                                <li>
                                    <span>Great Grand Child</span>
                                </li>
                                <li>
                                    <span>Great Grand Child</span>
                                </li>
                            </ul>
                        </li>
                        <li><span>Grand Child</span></li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>