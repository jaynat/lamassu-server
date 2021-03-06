import { makeStyles } from '@material-ui/core/styles'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import moment from 'moment'
import * as R from 'ramda'
import React from 'react'

import Title from 'src/components/Title'
import DataTable from 'src/components/tables/DataTable'
import { ReactComponent as TxInIcon } from 'src/styling/icons/direction/cash-in.svg'
import { ReactComponent as TxOutIcon } from 'src/styling/icons/direction/cash-out.svg'

import styles from './CustomersList.styles'

const useStyles = makeStyles(styles)

const CustomersList = ({ data, onClick }) => {
  const classes = useStyles()

  const elements = [
    {
      header: 'Name',
      width: 277,
      view: R.path(['name'])
    },
    {
      header: 'Phone',
      width: 186,
      view: it => parsePhoneNumberFromString(it.phone).formatInternational()
    },
    {
      header: 'Total TXs',
      width: 154,
      textAlign: 'right',
      view: it => `${Number.parseInt(it.totalTxs)}`
    },
    {
      header: 'Total spent',
      width: 188,
      textAlign: 'right',
      view: it => `${Number.parseFloat(it.totalSpent)} ${it.lastTxFiatCode}`
    },
    {
      header: 'Last active',
      width: 197,
      view: it => moment.utc(it.lastActive).format('YYYY-MM-D')
    },
    {
      header: 'Last transaction',
      width: 198,
      textAlign: 'right',
      view: it => (
        <>
          {`${Number.parseFloat(it.lastTxFiat)} ${it.lastTxFiatCode}`}
          {it.lastTxClass === 'cashOut' ? (
            <TxOutIcon className={classes.txClassIconRight} />
          ) : (
            <TxInIcon className={classes.txClassIconRight} />
          )}
        </>
      )
    }
  ]

  return (
    <>
      <div className={classes.titleWrapper}>
        <div className={classes.titleAndButtonsContainer}>
          <Title>Customers</Title>
        </div>
        <div className={classes.headerLabels}>
          <div>
            <TxOutIcon />
            <span>Cash-out</span>
          </div>
          <div>
            <TxInIcon />
            <span>Cash-in</span>
          </div>
        </div>
      </div>
      <DataTable elements={elements} data={data} onClick={onClick} />
    </>
  )
}

export default CustomersList
