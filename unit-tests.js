// im tetsing core logic
function buildTask(text, deadline, category) {
    if (!text) throw new Error("Task text is required");
    return { text, deadline, category, completed: false };
  }
  
  //emoshiogwe
  function testBuildTask() {
    const task = buildTask("Read book", "2025-05-01", "study");
  
    if (task.text === "Read book" && task.category === "study" && task.completed === false) {
      console.log(" testBuildTask PASSED");
    } else {
      console.error(" testBuildTask failed");
    }
  }
  
  function testBuildTaskThrowsError() {
    try {
      buildTask("", "2025-05-01", "study");
      console.error(" testBuildTaskThrowsError failed (no error thrown)");
    } catch (err) {
      if (err.message === "Task text is required") {
        console.log(" testBuildTaskThrowsError PASSED");
      } else {
        console.error(" testBuildTaskThrowsError failed with wrong error message");
      }
    }
  }
  
  function testInvalidEmailFormat() {
    const invalidEmail = "bademail.com";
    const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(invalidEmail);
  
    if (!isValid) {
      console.log(" testInvalidEmailFormat PASSED");
    } else {
      console.error(" testInvalidEmailFormat failed");
    }
  }
  
  //alicia
  function testTimerConversion() {
    const minutes = 25;
    const expected = 1500;
    if (minutes * 60 === expected) {
      console.log(" testTimerConversion PASSED");
    } else {
      console.error(" testTimerConversion failed");
    }
  }
  

  function testTimerConversion() {
    const minutes = 25;
    const expected = 1500;
    if (minutes * 60 === expected) {
      console.log(" testTimerConversion PASSED");
    } else {
      console.error(" testTimerConversion failed");
    }
  }

  function testFailingExample() {
    let tasks = []; // on purpose
    const expectedLength = 1;
  
    if (tasks.length === expectedLength) {
      console.log("testFailingExample PASSED ");
    } else {
      console.error(" testFailingExample FAAILED task array length was", tasks.length, "but expected", expectedLength);
    }
  }
  
  
  
  function runAllTests() {
    console.log("Running StudyFit Unit Tests...");
    testBuildTask();
    testBuildTaskThrowsError();
    testInvalidEmailFormat();
    testTimerConversion();
    testFailingExample(); 
    console.log("All tests completed.");
  }
  
  
  runAllTests();
  