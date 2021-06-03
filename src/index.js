
// Our XMLHttpRequest Promise Request

const XHRequest = {
  post: (url, data) => {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      const jsonData = JSON.stringify(data);
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(jsonData);
    });
  }
};


  const tracker      = "https://tracker.simplaex-code-challenge.com"
  const rv_analytics = "SIMPLAEX CODE CHALLENGE LOG rivraddonanalytics.enableAnalytics"

  // Main global object

  const rivraddon = {
    analytics: {
      enableAnalytics: function() {
        console.log(rv_analytics);
      },
      trackPbjsEvent: function({ eventType }) {
        XHRequest.post(tracker, { eventType })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.error("Error:", error.statusText);
          });
      }
    }
  };
  
  // And lastly, applying the global object

  window["rivraddon"] = rivraddon;

  export {XHRequest,rivraddon};