const InputForm = () => {
  return (
    <div>
      <input />
      <input />
      <input />
      <button>Calculate</button>
    </div>
  );
};

const ResultTable = () => {
  return (
    <table>
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
    </table>
  );
};

const ActuarialModelCalculation = () => {
  return (
    <div>
      <InputForm />
      <ResultTable />
    </div>
  );
};

export default ActuarialModelCalculation;
