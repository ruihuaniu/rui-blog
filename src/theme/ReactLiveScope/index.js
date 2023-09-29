import React from 'react';

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

const binaryTree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)));


const TestCaseDataTypes = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  FUNCTION: "function"
}


const checkTestCaseDataType = (testCase) => {
  let result = typeof testCase;
  if (result === TestCaseDataTypes.OBJECT) {
    if (Array.isArray(testCase)) {
      result = TestCaseDataTypes.ARRAY
    }
  }
  return result
}

function TestRun({ codeFn, testCases, res }) {
  return (
    <div>
      <h3>Total test cases: {testCases.length}</h3>
      <hr />
      {res ? testCases.map((test, index) => <pre>
        <b>Input: </b>"{JSON.stringify(test, null, 2)}"{'\n'}
        <b>Output: </b>"{codeFn(test, 1)} {JSON.stringify(res, null, 2)}"{'\n'}
      </pre>) : testCases.map((test, index) => <pre>
        <b>Input: </b>"{test}"{'\n'}
        <b>Output: </b>"{codeFn(test)}"{'\n'}
      </pre>)}
    </div>
  );
}


function RunTestCases({ mainFn, testCases }) {
  return (
    <div>
      <h3>Total test cases: {testCases.length}</h3>
      <hr />
      {testCases.map((test, index) => {

        switch (checkTestCaseDataType(test)) {
          case TestCaseDataTypes.STRING:
          case TestCaseDataTypes.NUMBER:
          case TestCaseDataTypes.BOOLEAN:
            return <pre>
              <b>Input: </b>"{test}"{'\n'}
              <b>Output: </b>"{JSON.stringify(mainFn(test))}"{'\n'}
            </pre>
          case TestCaseDataTypes.ARRAY:
            return <pre>
              <b>Input: </b>"{JSON.stringify(test, null, 2)}"{'\n'}
              <b>Output: </b>{JSON.stringify(mainFn(...test))}{'\n'}
            </pre>
          case TestCaseDataTypes.OBJECT:
            return <pre>
              <b>Input: </b>"{JSON.stringify(test)}"{'\n'}
              <b>Output: </b>{JSON.stringify(mainFn(...Object.values(test)))}{'\n'}
            </pre>
          default:
            console.error("Unknown test case type", test);
        }
      })}
    </div>
  );
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  TreeNode,
  binaryTree,
  TestRun,
  RunTestCases
};
export default ReactLiveScope;
