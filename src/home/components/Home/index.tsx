import React, { FunctionComponent, ReactNode, useMemo } from 'react'

import {
  Box,
  Container,
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
import useTransactions from '../../../hooks/useTransactions'
import { apiFormatDate } from '../../../utils/date'
import { styles } from './styles'

interface Props {
  onPressRow: (userId: string) => void
}

const Home = (props: Props) => {
  const { onPressRow } = props
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const { balance } = useTransactions()
  const rows = useMemo(() => {
    const components: ReactNode[] = []
    if (balance) {
      Object.keys(balance)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((key) => {
          components.push(
            <TableRow key={key} sx={styles.tableRow} onClick={() => onPressRow(key)} hover>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{balance[key].currencies['GBP']?.amount || '-'}</TableCell>
              <TableCell align="right">{balance[key].currencies['USD']?.amount || '-'}</TableCell>
              <TableCell align="right">{balance[key].currencies['EUR']?.amount || '-'}</TableCell>
              <TableCell align="right">{apiFormatDate(balance[key].last_activity)}</TableCell>
            </TableRow>
          )
        })
    }
    return components
  }, [balance, page, rowsPerPage])

  return (
    <Container maxWidth="md" style={styles.container}>
      <Box sx={styles.content}>
        <Typography
          id="modal-modal-title"
          variant="h3"
          component="h2"
          marginBottom={2}
          align="center"
          color="#FFF"
        >
          List of transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell align="right">GBP</TableCell>
                <TableCell align="right">USD</TableCell>
                <TableCell align="right">EUR</TableCell>
                <TableCell align="right">Last Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={balance ? Object.keys(balance).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={styles.pagination}
        />
      </Box>
    </Container>
  )
}

export default Home
