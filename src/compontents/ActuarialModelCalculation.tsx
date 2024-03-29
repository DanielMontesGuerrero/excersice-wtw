import { useState } from "react";
import { postActuarialModelCalculation } from "../services/actuarialModel";
import {
  ActuarialModelCalculationResponse,
  ActuarialModelPayload,
  ExecutionTypes,
} from "../types/ActuarialModelPayload";
import "./ActuarialModelCalculation.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    } else if (mainLimitNum <= 0) {
      errors.push("Main retention must be greater than 0");
    } else if (isNaN(mainLimitNum)) {
      errors.push("Main retention must be a number");
    }

    if (mainRetention.length === 0) {
      errors.push("Please capture the main limit");
    } else if (mainRetentionNum <= 0) {
      errors.push("Main retention must be greater than 0");
    } else if (isNaN(mainRetentionNum)) {
      errors.push("Main retention must be a number");
    }
    if (executionType.length === 0) {
      errors.push("Please select the execution type");
    }

    setErrorList(errors);
    if (errors.length === 0) {
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
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      item.date,
    );
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      item.date,
    );
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      item.date,
    );
    return (
      <tr className={index % 2 === 0 ? "even" : ""} key={`result-${index}`}>
        <td>{`${day} ${month} ${year}`}</td>
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
  const TIME_DELAY = 3000;
  const [result, setResult] = useState<
    ActuarialModelCalculationResponse | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onCalculate = (payload: ActuarialModelPayload) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(postActuarialModelCalculation(payload));
    }, TIME_DELAY);
  };

  return (
    <div className="ActuarialModelCalculation-container">
      <InputForm onCalculateTriggered={(payload) => onCalculate(payload)} />
      {isLoading ? (
        <div className="Loading-spinner">
          <AiOutlineLoading3Quarters size={50} />
        </div>
      ) : (
        <ResultTable data={result} />
      )}
    </div>
  );
};

export default ActuarialModelCalculation;
