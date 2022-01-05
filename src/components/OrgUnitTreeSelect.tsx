import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { TreeSelect } from "antd";
import { flatten } from "lodash";
import { useEffect, useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { useUserOrgUnit } from "../stores/Queries";
import { useStore } from "effector-react";
import { $store } from "../stores/Store";
import { setSelectedUnits } from "../stores/Events";
import { Spinner, Stack, Text } from "@chakra-ui/react";

const query = (parent: any) => {
  return {
    response: {
      resource: "organisationUnits.json",
      params: {
        filter: `id:in:[${parent.id}]`,
        paging: "false",
        order: "shortName:desc",
        fields: "children[id,name,path,leaf]",
      },
    },
  };
};
const OrgUnitTreeSelect = () => {
  const [units, setUnits] = useState<any[]>([]);
  const store = useStore($store);
  const engine = useDataEngine();
  const { data, isError, isLoading, isSuccess, error } = useUserOrgUnit();
  const onLoadData = async (parent: any) => {
    try {
      const {
        response: { organisationUnits },
      }: any = await engine.query(query(parent));
      const found = organisationUnits.map((unit: any) => {
        return unit.children
          .map((child: any) => {
            return {
              id: child.id,
              pId: parent.id,
              value: child.id,
              title: child.name,
              isLeaf: child.leaf,
            };
          })
          .sort((a: any, b: any) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
      });
      setUnits([...units, ...flatten(found)]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data && units.length === 0) {
      setUnits(data);
    }
  }, [data, units]);

  return (
    <div>
      {isLoading && <Spinner />}
      {isSuccess && (
        <TreeSelect
          allowClear={true}
          treeDataSimpleMode
          size="large"
          showArrow
          style={{ width: "40%" }}
          value={store.selectedUnits}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select health centre"
          onChange={(value) => setSelectedUnits(value)}
          loadData={onLoadData}
          treeData={units}
        />
      )}
      {isError && <pre>{JSON.stringify(error)}</pre>}
    </div>
  );
};

export default OrgUnitTreeSelect;
