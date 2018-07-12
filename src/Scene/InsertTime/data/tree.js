import {getData} from './data'

function Node(data, parent) {
    this.data = data;
    this.parent = parent;
    this.children = [];
}

function Tree(data) {
    let node = new Node(data, null);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
    (function recurse(currentNode) {
        for(let i=0, length= currentNode.children.length; i<length; i++) {
            recurse(currentNode.children[i]);
        }
        
        callback(currentNode);
    }
    )(this._root);
}

Tree.prototype.find =function(node, id, callback, step) {
    if(node.data.id == id) callback(node, step);
    
        for(let i=0, length= node.children.length; i<length; i++) {
            tree.find(node.children[i], id, callback, step);
        }
}

let tree = new Tree("Anketa");

let nodesString = getData();
let numNodes=0;

let nodes = JSON.parse(nodesString);
nodes.forEach(function(node) {
    let a = node.id.split(".");
    let parent="";
    for(let i=0; i<a.length; i++) {
        if(a[i+1]) {
            parent += a[i]+".";
        }
    }
    
    //console.log(node.id, parent);
    
    try {
        if(parent=="") {
            tree._root.children.push(new Node({id:node.id, name: node.name}, parent));
            //console.log("ROOT ADDED ", node.id);
            numNodes++;
        } else {
            tree.find(tree._root, parent, function(parentNode) {
                //console.log(" PARENT NODE ", parentNode);
                parentNode.children.push(new Node({id:node.id, name: node.name}, parent));
                numNodes++;
                //console.log("CHILD ADDED ", node.id, " TO PARENT ", parent);
                });
        }		
    } catch (e) {
        console.log(e, " PARENT ", parent)
        debugger
    }
});
console.log("DODATO NODOVA: ", numNodes);

tree._root.children.sort(function(a, b) { 
//1.1.4. - last num  4
a = a.data.id;
b = b.data.id;
    if(a.length>0 && a.substr(a.length-1, 1) != ".") a += ".";
    if(a.length) {
            let aNum = a.split(".")[a.split(".").length-2];
            let bNum = b.split(".")[b.split(".").length-2];
            if(Number(aNum) < Number(bNum)) {
                return -1;
            }
            if(Number(aNum) > Number(bNum)) {
                return 1;
            }	
            return 0;
    }
    return 0;

});


export default tree;