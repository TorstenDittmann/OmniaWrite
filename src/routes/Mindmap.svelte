<script>

</script>

<style>
    ul {
        min-height: 100%;
        display: inline-block;
        vertical-align: middle;
        list-style: none;
    }

    li {
        display: inline-block;
        vertical-align: middle;
        clear: left;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    ul ul {
        border-left: 1px solid white;
        border-radius: 16px;
        padding-left: 16px;
        margin-left: 16px;
        position: relative;
    }

    ul ul:after {
        width: 16px;
        height: 16px;
        /*background-color: red;*/
        position: absolute;
        top: 50%;
        content: "";
        left: -11px;
        margin-top: -6px;
        width: 0;
        height: 0;
        border: 4px solid;
        border-color: white black white white;
    }
</style>

<div class="mindmap">
    <ul contenteditable="true">
        <li> item 1
            <ul>
                <li>subitem 1
                    <ul>
                        <li>sub-sub-item</li>
                    </ul>

                </li>
                <li>subitem 2</li>
                <li>subitem 3</li>
                <li>subitem 4</li>
                <li>subitem 5</li>
            </ul>
        </li>
        <li>item 2 </li>
    </ul>
</div>