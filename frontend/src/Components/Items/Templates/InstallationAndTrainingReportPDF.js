//import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import OpenSansRegular from './Sans-Serif/static/OpenSans-Regular.ttf';
import OpenSansBold from './Sans-Serif/static/OpenSans-Bold.ttf';
import ArialFont from './ArialFont/ARIAL.TTF'; 
import TimesNewRoman from './Tinos/Tinos-Regular.ttf'
import TinosBold from './Tinos/Tinos-Bold.ttf'
// Register the Arial font
Font.register({
    family: 'Arial',
    src: ArialFont,
  });

// Register the Times font
Font.register({
    family: 'TimesNewRoman',
    src: TimesNewRoman,
  });

  // Register the Times font
Font.register({
    family: 'Tinos-Bold',
    src: TinosBold,
  });

// Register the custom font
Font.register({
    family: 'OpenSans',
    src: OpenSansRegular,
  });

  Font.register({
    family: 'OpenSans-Bold',
    src: OpenSansBold ,
  })

const styles = StyleSheet.create({

  page: {
   // fontFamily: 'Arial',
    padding: 20,
  },

  body: {
    fontSize: 12,
    marginBottom: '',
  },

  header: {
    fontSize: 25,
    fontFamily: 'Tinos-Bold', // Use the bold font family here
    textAlign: 'center',
    marginBottom: 20,
  },

  address: {
    marginBottom: 20,
    fontSize: 12,
  },

  text: {
    fontSize: 12,
    marginBottom: 25, // Adjust this value as needed
  },

  table: {
    border: '1 solid black',
    borderCollapse: 'collapse',
    // marginTop: 10,
    fontSize: 10,
    marginBottom: 10,
  },

  tableRow: {
    flexDirection: 'row',
    // borderBottom: '1 solid black',
  },

  tableHead: {
    fontFamily: 'Tinos-Bold',
    borderBottom: '1 solid black',
  },

  tableCell: {
    width: '25%',
    borderRight: '1 solid black',
    padding: 5,
    textAlign: 'left',
  },

  // Adjust the percentage for each column as needed
  slNoColumn: {
    width: '8%', // Adjust the width percentage for this column
    borderRight: '1 solid black',
    padding: 5,
    textAlign: 'left',
  },
  productNameColumn: {
    width: '40%', // Adjust the width percentage for this column
    borderRight: '1 solid black',
    padding: 5,
    textAlign: 'left',
  },
  productSerialNoColumn: {
    width: '30%', // Adjust the width percentage for this column
    borderRight: '1 solid black',
    padding: 5,
    textAlign: 'left',
  },
  remarksColumn: {
    width: '20%', // Adjust the width percentage for this column
    padding: 5,
    textAlign: 'left',
  },

signatureParentContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    
},
  signatureContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  signatureImage: {
    width: 150, // Adjust width as needed
    height: 75, // Adjust height as needed
  },

  signatureText: {
    fontFamily: 'Tinos-Bold', // Use the bold font family here
    fontSize: 12,
  },

  image: {
    flexDirection: 'row',
     width: 130,
     height: 75,
     left: 430,
  },


  spacer: {
    height: 110, // Adjust this value as needed to create space for the image
  },

  inlineFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10, // Or adjust as needed
  },

  inlineField: {
    flex: 1
  },

});

const InstallationAndTrainingReportPDF = ({ formData }) => (
  
  <Document>
    <Page size="A4" style={styles.page}>
        <Image src='./cdacFavicon2.png' style={styles.image} />
        
       <View>
         <Text style={styles.header}>INSTALLATION & TRAINING REPORT</Text>
       </View>
      
      <View style={styles.address}>
        <Text>
          Centre for Development of Advanced computing
          {'\n'}
          C-DAC Knowledge Park, No.1 Old madras Road,
          {'\n'}
          Byappanahalli, Bangalore - 560038
          {'\n'}
          Ph: 080 -25244059 / 66116400
        </Text>
      </View>
      
<View style={styles.body}>
   <View style={styles.inlineFields} >
    <View style={{ flex: '1' }} >
       <Text style={styles.text}>Name of the Customer </Text>
     </View>
     <View style={{ flex: '3'}} >
       <Text> :     {formData && formData.customerName} </Text>
     </View>

    </View>
    <View style={styles.inlineFields} >
      <View style={{ flex: '1' }} >
       <Text style={styles.text}>Address</Text>
      </View>
      <View style={{ flex: '3', flexDirection : 'column'}} >
        <Text>:     {formData && formData.address}</Text>
      </View>
    </View>
  
      {/* Nested View for End User Name and Designation */}
    <View style={styles.inlineFields}>
      <View style={styles.inlineField}>
       <View style={styles.inlineFields}>
        <View style={{ flex: '1' }} >
          <Text style={styles.text}>End User Name</Text>
        </View>
        <View style={{ flex: '1'}} >
         <Text>:     {formData && formData.endUserName}</Text>
       </View>
      </View>
     </View>
     <View style={styles.inlineField}>
      <View style={styles.inlineFields}>
      <View style={{ flex: '1' }} >
        <Text style={styles.text}>Designation</Text>
      </View>
      <View style={{ flex: '1'}} >
        <Text>:     {formData && formData.designation}</Text>
      </View>
      </View>
     </View>
   </View>

   <View style={styles.inlineFields}>
     <View style={styles.inlineField}>
      <View style={styles.inlineFields}>
        <View style={{ flex: '1' }} >
          <Text style={styles.text}>Tel No</Text>
        </View>
       <View style={{ flex: '1'}} >
         <Text> :     {formData && formData.telNo} </Text>
       </View>
      </View>
      </View>
      <View style={styles.inlineField}>
        <View style={styles.inlineFields}>
          <View style={{ flex: '1' }}>
           <Text style={styles.text}>Invoice No</Text>
          </View>
          <View style={{ flex: '1'}} >
            <Text style={styles.text}>:     {formData && formData.invoiceNo}</Text>
          </View>
        </View>
      </View> 
   </View>

   <View style={styles.inlineFields}>
     <View style={styles.inlineField}>
      <View style={styles.inlineFields}>
       <View style={{ flex: '1' }}>
        <Text style={styles.text}>Training from Date</Text>
       </View>
       <View style={{ flex: '1' }}>
         <Text>:     {formData && formData.fromDate}</Text>
       </View>
      </View>
   </View>
    <View style={styles.inlineField}>
     <View style={styles.inlineFields}>
     <View style={{ flex: '1' }}>
      <Text style={styles.text}>To Date</Text>
     </View>
     <View style={{ flex: '1' }}>
       <Text>:     {formData && formData.toDate}</Text>
     </View>
     </View>
    </View>
   </View>
</View>

      
      {/* Table section */}
       <View style={styles.table}>
        <View style={[styles.tableRow , styles.tableHead]}>
          <Text style={styles.slNoColumn}>Sl. No</Text>
          <Text style={styles.productNameColumn}>Product Name with Configuration</Text>
          <Text style={styles.productSerialNoColumn}>Product Serial No</Text>
          <Text style={styles.remarksColumn}>Remarks</Text>
          {/* Add more headers if needed */}
        </View>
        {formData &&
          formData.tableData.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.slNoColumn}>{row.slNo}</Text>
              <Text style={styles.productNameColumn}>{row.productName}</Text>
              <Text style={styles.productSerialNoColumn}>{row.productSerialNo}</Text>
              <Text style={styles.remarksColumn}>{row.remarks}</Text>
              {/* Add more cells based on your table structure */}
            </View>
          ))}
      </View>
      
      {/* Other sections */}
      <View style={styles.body} >
        <Text style={styles.text}>
          The above mentioned products are installed successfully and are working satisfactorily.
        </Text>
        <View style={styles.inlineFields} >
         <View style={{ flex: '3' }} >
         <Text style={styles.text}>
           TRAINING HAS BEEN COMPLETED UPTO CUSTOMER SATISFACTION
          </Text>
         </View>
         <View style={{ flex: '1' }} >
         <Text>:     {formData && formData.satisfied}</Text>
         </View>
      </View>
      </View>
      <View style={styles.signatureParentContainer}>
        <View style={styles.signatureContainer}>
            {formData && formData.HeadSignature && <Image src={URL.createObjectURL(formData.HeadSignature)} alt="signature"  style={styles.signatureImage} />}
            <Text style={styles.signatureText}>
             SIGNATURE OF HEAD OF THE DEPARTMENT
             {'\n'}
             WITH SEAL
           </Text>
          </View>
          <View style={styles.signatureContainer}>
          {formData && formData.EngineerSignature && <Image src={URL.createObjectURL(formData.EngineerSignature)} alt="signature"  style={styles.signatureImage} />}
           <Text style={styles.signatureText}>
             SIGNATURE OF THE ENGINEER
           </Text>
         </View>
      </View>
    </Page>
  </Document>
);

export default InstallationAndTrainingReportPDF;
