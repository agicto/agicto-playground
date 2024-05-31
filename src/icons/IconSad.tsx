import { memo } from 'react'
import * as React from 'react'

export const IconSad = memo<JSX.IntrinsicElements['svg']>(
  function IconSad(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" {...props}
fill="none" version="1.1" width="14" height="14" viewBox="0 0 14 14"><g><g><path d="M7,0C3.13438,0,0,3.13438,0,7C0,10.8656,3.13438,14,7,14C10.8656,14,14,10.8656,14,7C14,3.13438,10.8656,0,7,0ZM7,12.8125C3.79063,12.8125,1.1875,10.2094,1.1875,7C1.1875,3.79063,3.79063,1.1875,7,1.1875C10.2094,1.1875,12.8125,3.79063,12.8125,7C12.8125,10.2094,10.2094,12.8125,7,12.8125Z" fill="#3162FF" fillOpacity="1"/></g>
<g style={{opacity:'0.10000000149011612'}}>
  <path d="M7,1.1875C3.79063,1.1875,1.1875,3.79063,1.1875,7C1.1875,10.20938,3.79063,12.8125,7,12.8125C10.20938,12.8125,12.8125,10.20938,12.8125,7C12.8125,3.79063,10.20938,1.1875,7,1.1875ZM3.5,5.57812C3.50401,5.38186,3.58478,5.19499,3.725,5.05761C3.86522,4.92023,4.0537,4.84328,4.25,4.84328C4.4463,4.84328,4.63478,4.92023,4.775,5.05761C4.91522,5.19499,4.99599,5.38186,5,5.57812C4.99599,5.77439,4.91522,5.96126,4.775,6.09864C4.63478,6.23602,4.4463,6.31297,4.25,6.31297C4.0537,6.31297,3.86522,6.23602,3.725,6.09864C3.58478,5.96126,3.50401,5.77439,3.5,5.57812C3.5,5.57812,3.5,5.57812,3.5,5.57812ZM9.375,9.82812C9.375,9.82812,8.62344,9.82812,8.62344,9.82812C8.55781,9.82812,8.50156,9.77812,8.496870000000001,9.7125C8.4375,8.93906,7.78906,8.32812,7,8.32812C6.21094,8.32812,5.56094,8.93906,5.50313,9.7125C5.49844,9.77812,5.44219,9.82812,5.37656,9.82812C5.37656,9.82812,4.625,9.82812,4.625,9.82812C4.60805,9.82815,4.59126,9.82472,4.57568,9.81805C4.560090000000001,9.81138,4.54602,9.80161,4.534330000000001,9.78933C4.5226299999999995,9.77706,4.51356,9.76253,4.50766,9.74663C4.50176,9.73074,4.49915,9.71381,4.5,9.69687C4.56875,8.37969,5.66406,7.32812,7,7.32812C8.33594,7.32812,9.43125,8.37969,9.5,9.69687C9.50085,9.71381,9.49824,9.73074,9.49234,9.74663C9.48644,9.76253,9.47737,9.77706,9.46567,9.78933C9.45398,9.80161,9.43991,9.81138,9.42432,9.81805C9.40874,9.82472,9.39195,9.82815,9.375,9.82812C9.375,9.82812,9.375,9.82812,9.375,9.82812ZM9.75,6.32812C9.55374,6.32412,9.36687,6.24334,9.22948,6.10312C9.0921,5.96291,9.01515,5.77443,9.01515,5.57812C9.01515,5.38182,9.0921,5.19334,9.22948,5.0531299999999995C9.36687,4.91291,9.55374,4.832129999999999,9.75,4.82812C9.94626,4.832129999999999,10.13313,4.91291,10.27052,5.0531299999999995C10.4079,5.19334,10.48485,5.38182,10.48485,5.57812C10.48485,5.77443,10.4079,5.96291,10.27052,6.10312C10.13313,6.24334,9.94626,6.32412,9.75,6.32812C9.75,6.32812,9.75,6.32812,9.75,6.32812Z" fill="#3162FF" fillOpacity="1"/></g><g><path d="M3.5,5.578125C3.500000000000001,5.777037,3.5790175,5.967805,3.71967,6.108455C3.860322,6.249105,4.051088,6.328125,4.25,6.328125C4.448912,6.328125,4.63968,6.249105,4.78033,6.108455C4.92098,5.967805,5,5.777037,5,5.578125C5,5.379213,4.92098,5.188447,4.78033,5.047795C4.63968,4.9071425,4.448912,4.828125,4.25,4.828125C4.051088,4.828125,3.860322,4.9071425,3.71967,5.047795C3.5790175,5.188447,3.500000000000001,5.379213,3.5,5.578125C3.5,5.578125,3.5,5.578125,3.5,5.578125ZM7,7.328125C5.66406,7.328125,4.56875,8.379685,4.5,9.696875C4.4991520000000005,9.713805,4.50176,9.730735,4.50766,9.746635000000001C4.51356,9.762525,4.5226299999999995,9.777055,4.53433,9.789335000000001C4.54602,9.801605,4.56009,9.811385,4.57568,9.818045C4.59126,9.824715000000001,4.60805,9.828145,4.625,9.828125C4.625,9.828125,5.37656,9.828125,5.37656,9.828125C5.44219,9.828125,5.49844,9.778125,5.5031300000000005,9.712495C5.56094,8.939065,6.21094,8.328125,7,8.328125C7.78906,8.328125,8.4375,8.939065,8.496870000000001,9.712495C8.50156,9.778125,8.55781,9.828125,8.62344,9.828125C8.62344,9.828125,9.375,9.828125,9.375,9.828125C9.39195,9.828145,9.40874,9.824715000000001,9.42432,9.818045C9.439910000000001,9.811385,9.45398,9.801605,9.46567,9.789335000000001C9.47737,9.777055,9.48644,9.762525,9.49234,9.746635000000001C9.49824,9.730735,9.50085,9.713805,9.5,9.696875C9.43125,8.379685,8.33594,7.328125,7,7.328125ZM9,5.578125C9,5.777037,9.07902,5.967805,9.21967,6.108455C9.36032,6.249105,9.55109,6.328125,9.75,6.328125C9.94891,6.328125,10.13968,6.249105,10.28033,6.108455C10.42098,5.967805,10.5,5.777037,10.5,5.578125C10.5,5.379213,10.42098,5.188447,10.28033,5.047795C10.13968,4.9071425,9.94891,4.828125,9.75,4.828125C9.55109,4.828125,9.36032,4.9071425,9.21967,5.047795C9.07902,5.188447,9,5.379213,9,5.578125C9,5.578125,9,5.578125,9,5.578125Z" fill="#3162FF" fillOpacity="1"/></g></g></svg>
    )
  }
)