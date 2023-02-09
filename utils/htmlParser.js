const htmlParser = {};

htmlParser.toParagraph = (obj) => {
    return `<div class="_block"><p>${obj.text}</p></div>`;
};

htmlParser.toHeader = (obj) => {
    return `<div class="_block"><h${obj.level}>${obj.text} : </h${obj.level}></div>`;
};

htmlParser.toQuote = (obj) => {
    return `<div class="_block"><blockquote class="quote-${obj.alignment}"><p><em>${obj.text}</em></p><p><em>- ${obj.caption}</em></p></blockquote></div>`;
};

htmlParser.toList = (obj) => {
    let listItem = '';
    obj.items.map((item) => {
        listItem += `<li>${item}</li>`;
    });
    if (obj.style === "unordered") {
        return `<div class="_block"><ul>${listItem}</ul></div>`;
    } else {
        return `<div class="_block"><ol>${listItem}</ol></div>`;
    }
};

htmlParser.toTable = (obj) => {
    let tableHeadings = '';
    let tableData = '';
    let isHeadingPresent = obj.withHeadings;
    if (isHeadingPresent && obj.content.length >=2) {
        tableHeadings += '<tr>';
        obj.content[0].map((item) => {
            tableHeadings += `<th>${item}</th>`;
        });
        tableHeadings += '</tr>';
        tableData += '<tr>';
        obj.content.slice(1,).map((dataArray) => {
            dataArray.map((item) => {
                tableData += `<td>${item}</td>`;
            });
            tableData += '</tr>';
        });
    } else {
        if (!isHeadingPresent && obj.content.length) {
            obj.content.map((dataArray) => {
                tableData += '<tr>';
                dataArray.map((item) => {
                    tableData += `<td>${item}</td>`;
                });
                tableData += '</tr>';
            });
        }
        else {
            let error = new Error("Content is missing from table!");
            error.status = 404;
            throw error;
        }
    }
    return `<div class="_block"><table>${tableHeadings}${tableData}</table></div>`;
};

htmlParser.toImage = (obj) => {

}

htmlParser.toCode = (obj) => {

}

htmlParser.toDelimiter = (obj) => {
    
}

module.exports = htmlParser;