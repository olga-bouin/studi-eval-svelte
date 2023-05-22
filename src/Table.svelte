<script>
    export let tableData;
</script>
<div class="tableContainer">
            <table class="blueTable">
                <thead>
                <tr>
                    {#each Object.keys(tableData[0] || {}) as columnHeading}
                        <th>{columnHeading}</th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                {#each Object.values(tableData) as row}
                    <tr>
                        {#each Object.values(row) as cell}
                            <td>{cell}</td>
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
</div>

<style>
    .tableContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    table, th, td {
        border: 1px solid;
        border-collapse: collapse;
        margin-bottom: 10px;
    }

    table.blueTable {
        border: 1px solid #4F8A06;
        background-color: #EEEEEE;
        width: 80%;
        text-align: left;
        border-collapse: collapse;
    }

    table.blueTable td, table.blueTable th {
        border: 1px solid #AAAAAA;
        padding: 3px 2px;
    }

    table.blueTable tbody td {
        font-size: 13px;
    }

    table.blueTable tr:nth-child(even) {
        background: #D0E4F5;
    }

    table.blueTable thead {
        background: #4F8A06;
        background: -moz-linear-gradient(top, #4F8A06 0%, #4F8A06 66%, #4F8A06 100%);
        background: -webkit-linear-gradient(top, #4F8A06 0%, #4F8A06 66%, #4F8A06 100%);
        background: linear-gradient(to bottom, #4F8A06 0%, #4F8A06 66%, #4F8A06 100%);
        border-bottom: 2px solid #444444;
    }

    table.blueTable thead th {
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
        border-left: 2px solid #dae8c8;
    }

    table.blueTable thead th:first-child {
        border-left: none;
    }
</style>
