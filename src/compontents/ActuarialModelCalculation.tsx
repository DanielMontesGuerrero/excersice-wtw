import { useState } from "react";
import { postActuarialModelCalculation } from "../services/actuarialModel";
import {
  ActuarialModelCalculationResponse,
  ActuarialModelPayload,
  ExecutionTypes,
} from "../types/ActuarialModelPayload";
import "./ActuarialModelCalculation.css";

interface InputFormProps {
  onCalculateTriggered: (payload: ActuarialModelPayload) => void;
}

const InputForm = ({ onCalculateTriggered }: InputFormProps) => {
  const [mainLimit, setMainLimit] = useState<string>("");
  const [mainRetention, setMainRetention] = useState<string>("");
  const [executionType, setExecutionType] = useState<string>("");
  const [errorList, setErrorList] = useState<string[]>([]);

  const onCalculate = () => {
    const errors = [];
    const mainLimitNum = parseInt(mainLimit, 10);
    const mainRetentionNum = parseInt(mainRetention, 10);

    if (mainLimit.length === 0) {
      errors.push("Please capture the main limit");
    } else if (mainLimitNum < 0) {
      errors.push("Main retention can not be negative");
    } else if (isNaN(mainLimitNum)) {
      errors.push("Main retention must be a number");
    }

    if (mainRetention.length === 0) {
      errors.push("Please capture the main limit");
    } else if (mainRetentionNum < 0) {
      errors.push("Main retention can not be negative");
    } else if (isNaN(mainRetentionNum)) {
      errors.push("Main retention must be a number");
    }
    if (executionType.length === 0) {
      errors.push("Please select the execution type");
    }

    if (errors.length > 0) {
      setErrorList(errors);
    } else {
      onCalculateTriggered({
        mainLimit: mainLimitNum,
        mainRetention: mainRetentionNum,
        executionType: executionType as ExecutionTypes,
      });
    }
  };

  const errorMessagesList = errorList.map((error, index) => {
    return <p className="error" key={`error-id-${index}`}>{`- ${error}`}</p>;
  });

  return (
    <div>
      {errorList.length > 0 ? (
        <div className="Errors-container">
          <p>Please fix the following issues:</p>
          {errorMessagesList}
        </div>
      ) : (
        <></>
      )}
      <div className="InputForm-container">
        <input
          placeholder="Capture the main limit"
          type="number"
          min="0"
          step="1000000"
          onChange={(e) => setMainLimit(e.target.value)}
        />
        <input
          placeholder="Capture the main retention"
          type="number"
          min="0"
          step="1000000"
          onChange={(e) => setMainRetention(e.target.value)}
        />
        <select
          onChange={(e) => setExecutionType(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select execution type:
          </option>
          <option value="simple">Simple</option>
          <option value="complex">Complex</option>
        </select>
        <button onClick={onCalculate}>Calculate</button>
      </div>
    </div>
  );
};

interface ResultTableProps {
  data?: ActuarialModelCalculationResponse;
}

const ResultTable = ({ data }: ResultTableProps) => {
  if (data === undefined) {
    return <></>;
  }

  const rows = data?.results.map((item, index) => {
    return (
      <tr className={index % 2 === 0 ? "even" : ""} key={`result-${index}`}>
        <td>{item.date.toDateString()}</td>
        <td>{`${item.benchmarks[0].toFixed(2)}%`}</td>
        <td>{`${item.benchmarks[1].toFixed(2)}%`}</td>
      </tr>
    );
  });
  return (
    <table className="ResultTable-container">
      <thead>
        <tr>
          <th>Reference date</th>
          <th>Benchmark 1</th>
          <th>Benchmark 2</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const ActuarialModelCalculation = () => {
  const [result, setResult] = useState<
    ActuarialModelCalculationResponse | undefined
  >(undefined);

  const onCalculate = (payload: ActuarialModelPayload) => {
    setResult(postActuarialModelCalculation(payload));
  };

  return (
    <div className="ActuarialModelCalculation-container">
      <InputForm onCalculateTriggered={(payload) => onCalculate(payload)} />
      <ResultTable data={result} />
    </div>
  );
};

export default ActuarialModelCalculation;
