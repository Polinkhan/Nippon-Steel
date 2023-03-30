import Papa from "papaparse";
const csv2json = async (file, callback) => {
  Papa.parse(file, {
    complete: function (results) {
      const [label, ...data] = results.data;

      const filterData = data.filter((list) => list.length === 20 && list);
      console.log(data, filterData);

      callback({ label, data: filterData });
    },
  });
};

export { csv2json };
