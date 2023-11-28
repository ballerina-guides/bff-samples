/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useCallback, useEffect, useState } from 'react';

export const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  };
};
