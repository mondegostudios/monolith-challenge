import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import useUserDetail from '../../hooks/useUserDetail'
import { convertToDateTime } from '../../utils/date'
import { Currency, Transaction } from '../../services/TransactionService/types'
import { isTransactionValid } from '../../validators/transactionsValidator'
import { styles } from './styles'

interface Props {
  userId?: string
  onClose: () => void
}

const UserDetailModal = (props: Props) => {
  const { userId, onClose } = props
  const { userDetails } = useUserDetail({ userId })

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [operation, setOperation] = useState<'debit' | 'credit'>()
  const [currency, setCurrency] = useState<Currency>()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const close = () => {
    setOperation(undefined)
    setCurrency(undefined)
    onClose()
  }

  const returnBgColor = (amount: string, isValid: boolean) => {
    if (!isValid || !amount) return '#ff0000'
    if (Number(amount) > 0) return '#d2f7d8'
    if (Number(amount) < 0) return '#ffbbba'
  }

  const filteredDetails = useMemo(() => {
    const operationFilterDetails = userDetails
      ?.filter(
        (item) =>
          !item.amount ||
          (operation !== 'debit' && Number(item.amount) > 0) ||
          (operation !== 'credit' && Number(item.amount) < 0)
      )
      .filter((item) => !currency || item.currency === currency)

    return operationFilterDetails
  }, [operation, userDetails, currency])

  const renderRows = () => {
    if (filteredDetails) {
      return filteredDetails
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((transaction) => {
          const isValid = isTransactionValid(transaction)
          return (
            <TableRow
              key={transaction.timestamp}
              sx={{
                backgroundColor: returnBgColor(transaction?.amount, isValid),
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
              hover
            >
              <TableCell component="th" scope="row">
                {transaction.amount} {!isValid && ' - invalid'}
              </TableCell>
              <TableCell align="right">{transaction.currency}</TableCell>
              <TableCell align="right">{convertToDateTime(transaction.timestamp)}</TableCell>
            </TableRow>
          )
        })
    }
  }

  const onPressOperation = (op: 'debit' | 'credit') => {
    if (op === operation) return setOperation(undefined)
    setOperation(op)
  }

  const onPressCurrency = (c: Currency) => {
    if (c === currency) return setCurrency(undefined)
    setCurrency(c)
  }

  return (
    <Modal
      open={!!userId}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Box sx={styles.container}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          marginBottom={2}
          align="center"
        >
          Transactions for <b>{userId}</b>
        </Typography>

        <div style={styles.buttonContainer}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => onPressOperation('debit')}
              variant={operation === 'debit' ? 'contained' : 'outlined'}
            >
              Debit
            </Button>
            <Button
              onClick={() => onPressOperation('credit')}
              variant={operation === 'credit' ? 'contained' : 'outlined'}
            >
              Credit
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => onPressCurrency('GBP')}
              variant={currency === 'GBP' ? 'contained' : 'outlined'}
            >
              GBP
            </Button>
            <Button
              onClick={() => onPressCurrency('USD')}
              variant={currency === 'USD' ? 'contained' : 'outlined'}
            >
              USD
            </Button>
            <Button
              onClick={() => onPressCurrency('EUR')}
              variant={currency === 'EUR' ? 'contained' : 'outlined'}
            >
              EUR
            </Button>
          </ButtonGroup>
        </div>
        <TableContainer component={Paper}>
          <Table sx={styles.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredDetails?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Modal>
  )
}

export default UserDetailModal
