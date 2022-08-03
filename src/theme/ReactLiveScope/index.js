import React from 'react';

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

const binaryTree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)));



function TestRun({ codeFuc, testCases, res }) {
  return (
    <div>
      <h3>Total test cases: {testCases.length}</h3>
      <hr />
      {res ? testCases.map((test, index) => <pre>
        <b>Input: </b>"{JSON.stringify(test, null, 2)}"{'\n'}
        <b>Output: </b>"{codeFuc(test, 1)} {JSON.stringify(res, null, 2)}"{'\n'}
      </pre>) : testCases.map((test, index) => <pre>
        <b>Input: </b>"{test}"{'\n'}
        <b>Output: </b>"{codeFuc(test)}"{'\n'}
      </pre>)}
    </div>
  );
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  TreeNode,
  binaryTree,
  TestRun
};
export default ReactLiveScope;
