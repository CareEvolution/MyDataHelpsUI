import { DeviceDataV2Query } from "@careevolution/mydatahelps-js";
import queryOuraHeartRate from "../../../src/helpers/daily-data-providers/query-oura-heart-rate";

const hrdata = [{"id":"7851b","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"67","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:59:25","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"awake"},"dataSource":{}},
	{"id":"95314","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"51","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:59:23","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"rest"},"dataSource":{}},
	{"id":"44e0e","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"49","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:36:03","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"sleep"},"dataSource":{}},
	{"id":"76c5d","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"46","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:35:43","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"workout"},"dataSource":{}},
	{"id":"d9e14","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"48","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:35:22","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"rest"},"dataSource":{}},
	{"id":"27514","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"57","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-09T23:25:36","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.090409Z","modifiedDate":"2025-03-10T18:49:08.090409Z","properties":{"source":"awake"},"dataSource":{}},
	{"id":"8a9e2","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"73","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-08T20:56:34","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"workout"},"dataSource":{}},
	{"id":"a510d","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"54","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-08T20:56:29","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"rest"},"dataSource":{}},
	{"id":"702b9","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"64","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-08T20:56:24","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"workout"},"dataSource":{}},
	{"id":"1ea2f","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"49","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-08T20:56:19","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"session"},"dataSource":{}},
	{"id":"20818","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"54","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-08T20:56:14","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"workout"},"dataSource":{}},
	{"id":"20819","participantID":"1234","participantIdentifier":"abc1","namespace":"Oura","type":"heart-rate","identifier":null,"value":"51","units":"bpm","startDate":null,"startDateOffset":null,"observationDate":"2025-03-10T20:56:14","observationDateOffset":"00:00:00","insertedDate":"2025-03-10T18:49:08.006246Z","modifiedDate":"2025-03-10T18:49:08.006246Z","properties":{"source":"rest"},"dataSource":{}}
];

	jest.mock('@careevolution/mydatahelps-js', () => {
		return {
			__esModule: true,
			default: {
				queryDeviceDataV2: jest.fn(()=>Promise.resolve( { deviceDataPoints: hrdata } ))
			}
		}
	});
	
	describe('Query Oura Heart Rate', () => {
		it('should return resting heart rate data', async () => {
			const startDate = new Date('2025-03-04T00:00:00'); // these dates are ignored since this is a mock
			const endDate = new Date('2025-03-11T00:00:00');
			const result = await queryOuraHeartRate(startDate, endDate, ["rest"], 'min');
			expect(result).toEqual({
				'2025-03-09': 48,
				'2025-03-08': 54,
				'2025-03-10': 51
			});
		});	
	});


