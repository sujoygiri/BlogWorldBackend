const htmlParser = require('../utils/htmlParser');

const blogController = {};


blogController.parseData = (dataArray) => {
    let parsedHTML = '';
    dataArray.map(obj => {
        switch (obj.type) {
            case 'paragraph':
                parsedHTML += htmlParser.toParagraph(obj.data);
                break;
            case 'header':
                parsedHTML += htmlParser.toHeader(obj.data);
                break;
            case 'quote':
                parsedHTML += htmlParser.toQuote(obj.data);
                break;
            case 'list':
                parsedHTML += htmlParser.toList(obj.data);
                break;
            case 'table':
                parsedHTML += htmlParser.toTable(obj.data);
                break;
            case 'image':
                parsedHTML += htmlParser.toImage(obj.data);
                break;
            case 'code':
                parsedHTML += htmlParser.toCode(obj.data);
                break;
            case 'delimiter':
                parsedHTML += htmlParser.toDelimiter(obj.data)
                break
            default:
                parsedHTML += ''
                break;
        }
    });
    return parsedHTML;
};



module.exports = blogController;