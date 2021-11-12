import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./pages.css";
function Form() {
  const preferences = [
    { value: "Sightseeing", isChecked: false },
    { value: "Beaches", isChecked: false },
    { value: "Romantic", isChecked: false },
    { value: "Hiking", isChecked: false },
    { value: "Skiing", isChecked: false },
  ];

  const people = [
    { value: "Just me" },
    { value: "A couple" },
    { value: "Group of friends" },
    { value: "Family" },
  ];

  const budget = [
    { value: "On a budget" },
    { value: "Treating myself" },
    { value: "Not sure" },
  ];

  const [checkboxPreferences, setCheckboxPreferences] = useState(preferences);
  const [selectedPeople] = useState(people);
  const [selectedBudget] = useState(budget);
  const [peopleValue, setPeopleValue] = useState({
    value: "",
  });
  const [budgetValue, setBudgetValue] = useState({
    value: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const history = useHistory();
  const [submitError, setError] = React.useState(false);
  function onTestClick(e) {
    history.push({
      pathname: "/mapview",
    });
  }
  return (
    <div>
      <video src="/videos/views.mp4" autoPlay loop muted />
      <div className="container">
        <form>
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="card shadow border-0 mb-4">
                <div className="card-body p-5">
                  <h2 className="h4 mb-1">
                    Please select your activity preferences
                  </h2>
                  <p className="small text-muted font-italic mb-4">
                    What kind of activities are you interested in?
                  </p>
                  <ul className="list-group">
                    {checkboxPreferences.map((checkbox, index) => (
                      <li
                        className="list-group-item rounded-0"
                        key={checkbox.value}
                      >
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            id={checkbox.value}
                            type="checkbox"
                            onChange={(e) => {
                              const newCheckboxes = [...checkboxPreferences];
                              newCheckboxes[index].isChecked = e.target.checked;
                              setCheckboxPreferences(newCheckboxes);
                            }}
                            checked={checkbox.isChecked}
                          />
                          <label
                            className="cursor-pointer font-italic d-block custom-control-label"
                            htmlFor={checkbox.value}
                          >
                            {checkbox.value}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-4">
                <div className="card-body p-5">
                  <h2 className="h4 mb-1">How many people are you?</h2>
                  <p className="small text-muted font-italic mb-4">
                    Please tell me you have someone to go with
                  </p>
                  <ul className="list-group">
                    {selectedPeople.map((selected, index) => (
                      <li
                        className="list-group-item rounded-0 d-flex align-items-center justify-content-between"
                        key={selected.value}
                      >
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            id={selected.value}
                            type="radio"
                            name="amount"
                            onChange={(e) => {
                              setPeopleValue({
                                value: e.target.id,
                              });
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={selected.value}
                          >
                            <span className="small font-italic text-muted">
                              {selected.value}
                            </span>
                          </label>
                        </div>
                        <label htmlFor={selected.value}>
                          <img src="" alt="" width="60" />
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card shadow border-0 mb-5">
                <div className="card-body p-5">
                  <h2 className="h4 mb-1">How about your budget?</h2>
                  <p className="small text-muted font-italic mb-4">
                    How much are you willing to spend?
                  </p>
                  <ul className="list-group">
                    {selectedBudget.map((selected, index) => (
                      <li
                        className="list-group-item rounded-0 d-flex align-items-center justify-content-between"
                        key={selected.value}
                      >
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            id={selected.value}
                            type="radio"
                            name="budget"
                            onChange={(e) => {
                              setBudgetValue({
                                value: e.target.id,
                              });
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={selected.value}
                          >
                            <span className="small font-italic text-muted">
                              {selected.value}
                            </span>
                          </label>
                        </div>
                        <label htmlFor={selected.value}>
                          <img src="" alt="" width="60" />
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onTestClick}
              >
                {submitError
                  ? errorMessage && <div className="error"> {errorMessage} </div>
                  : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
