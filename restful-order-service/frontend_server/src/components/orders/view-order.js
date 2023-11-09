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

import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function SimpleDialog(props) {
  const { onClose, open, id, order } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <>
      <DialogTitle sx={{textAlign:"center"}}>Order</DialogTitle>
      <ul style={{padding:"1rem 5rem"}}>
        <li>
        <p><b>{"id -"}</b> {order.id}</p>
        </li>
        <li>
        <p><b>{"status -"}</b> {order.status}</p>
        </li>
        <li>
        <p><b>{"cargo -"}</b> {order.shipId == null ? "Not assigned": order.shipId}</p>
        </li>
        <li>
        <p><b>{"customer -"}</b> {order.customerId}</p>
        </li>
        <li>
        <p><b>{"Item -"}</b> {order.item}</p>
        </li>
        <li>
        <p><b>{"quantity -"}</b> {order.quantity}</p>
        </li>
      </ul>
      </>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string
};
