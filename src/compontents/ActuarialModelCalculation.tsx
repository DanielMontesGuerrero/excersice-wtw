import "./ActuarialModelCalculation.css";

const InputForm = () => {
  return (
    <div className="InputForm-container">
      <input placeholder="Capture the main limit" />
      <input placeholder="Capture the main retention" />
      <select>
        <option>Simple</option>
        <option>Complex</option>
      </select>
      <button>Calculate</button>
    </div>
  );
};

const ResultTable = () => {
  return (
    <table className="ResultTable-container">
      <tr>
        <th>Reference date</th>
        <th>Benchmark 1</th>
        <th>Benchmark 2</th>
      </tr>
      <tr>
        <td>22 jan 2027</td>
        <td>22%</td>
        <td>10%</td>
      </tr>
      <tr className="even">
        <td>22 jan 2027</td>
        <td>22%</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>22 jan 2027</td>
        <td>22%</td>
        <td>10%</td>
      </tr>
      <tr className="even">
        <td>22 jan 2027</td>
        <td>22%</td>
        <td>10%</td>
      </tr>
    </table>
  );
};

const ActuarialModelCalculation = () => {
  return (
    <div className="ActuarialModelCalculation-container">
      <InputForm />
      <ResultTable />
    </div>
  );
};

export default ActuarialModelCalculation;
